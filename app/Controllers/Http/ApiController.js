'use strict'

const AWS = require('aws-sdk')
const Env = use('Env')
const fs = require('fs')
const Helpers = use('Helpers')
const FileType = require('file-type')
const bluebird = require('bluebird')
const User = use('App/Models/User')
const Group = use('App/Models/Group')

const ChatMessage = use('App/Models/ChatMessage')
const NodeClam = require('clamscan')
const Database = use('Database')

const LoggingRepository = require('../../Repositories/Logging')

const AwsKey = use('App/Models/AwsKey')

const S3_BUCKET_CHAT = 'mygame-media/myG chat/chat_images'
const S3_BUCKET = 'mygame-media/user_files'
const S3_BUCKET_DELETE = 'mygame-media'

const AWS_ACCESS_KEY_ID = Env.get('AWS_ACCESS_KEY_ID')
const AWS_SECRET_ACCESS_KEY = Env.get('AWS_SECRET_ACCESS_KEY')

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird)

// create S3 instance
const s3 = new AWS.S3()

const uploadFile = (bucket, buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: bucket,
    ContentType: type.mime,
    Key: name,
  }
  return s3.upload(params).promise()
}

const generateRandomString = (length) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

class ApiController {
  async initialApp({ auth }) {
    if (auth.user) {
      return {
        userInfo: auth.user,
        port: process.env.PORT,
        logsOn: process.env.LOGS_ON,
        preventReload: process.env.PREVENT_RELOAD,
        featuresOn: process.env.FEATURES_ON,
      }
    } else {
      return {
        userInfo: 1981,
        port: process.env.PORT,
        logsOn: process.env.LOGS_ON,
        preventReload: process.env.PREVENT_RELOAD,
        featuresOn: process.env.FEATURES_ON,
      }
    }
  }

  async uploadFile({ auth, request, response }) {
    if (auth.user) {
      const isChat = request.input('chat') == 'true'

      if (isChat) {
        if (Env.get('CHAT_UPLOAD_DISABLED')) return response.status(500).json('CHAT_UPLOAD_DISABLED')
        const user = (await User.find(auth.user.id)).toJSON()
        const today = new Date()
        today.setDate(today.getDate() - 1)
        const isRecentUser = new Date(user.created_at) > today
        const attachmentsToday = await ChatMessage.query()
          .where('sender_id', auth.user.id)
          .andWhere('is_attachment', true)
          .andWhere('created_at', '>', today)
          .fetch()
        if (attachmentsToday && attachmentsToday.toJSON().length >= 30) return response.status(500).json('MAX_UPLOAD_REACHED')
        if (isRecentUser) return response.status(500).json('USER_CREATION')
      }

      var file = request.file('upload_file')
      var filename = request.input('filename')
      const bucket = isChat == true ? S3_BUCKET_CHAT : S3_BUCKET

      const timestamp_OG = Date.now().toString()
      var tmpfilename = auth.user.id + '_' + timestamp_OG + '_' + generateRandomString(6) + '_' + filename
      var tmpfilepath = Helpers.tmpPath('uploads') + '/' + tmpfilename

      if (fs.existsSync(tmpfilepath)) {
        fs.unlinkSync(tmpfilepath)
      }

      await file.move(Helpers.tmpPath('uploads'), {
        name: tmpfilename,
      })

      const isFileInfected = await this.isFileInfected(tmpfilepath)
      if (isFileInfected) return response.status(500).json('FILE_INFECTED')
      try {
        const buffer = fs.readFileSync(tmpfilepath)
        const type = await FileType.fromBuffer(buffer)
        const timestamp = Date.now().toString()

        let data = await uploadFile(bucket, buffer, tmpfilename, type)
        fs.unlinkSync(tmpfilepath)
        data.Location = data.Location.replace('mygame-media.s3.amazonaws.com', 'myG.gg')

        data.aws_key_id = await this.create_aws_keys_entry({ auth }, data.Key, request.input('type'), request.input('id'), data.Location)

        return response.status(200).json(data)
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return response.status(400).json(error)
      }
    }
  }

  async create_aws_keys_entry({ auth }, key, type, id, location) {
    type = String(type)

    if (auth.user) {
      try {
        if (key.length == undefined || key == null) {
          return
        }
        let post_id = null,
          group_id = null,
          chat_id = null,
          chat_message_id = null,
          comment_id = null,
          reply_id = null,
          game_name_id = null,
          sponsor_id = null

        switch (type) {
          case '1':
            const update_profile_img = await User.query()
              .where({ id: auth.user.id })
              .update({ profile_img: location })
            break
          case '2':
            const update_bg_img = await User.query()
              .where({ id: auth.user.id })
              .update({ profile_bg: location })
            break
          case '3':
            post_id = id
            break
          case '4':
            group_id = id
            if (id != undefined || id != null) {
              this.internal_deleteFile({ auth }, 4, id)

              const update_img = await Group.query()
                .where({ id: id })
                .update({ group_img: location })
            }
            break
          case '5':
            chat_id = id
            break
          case '6':
            chat_message_id = id
            break
          case '7':
            comment_id = id
            break
          case '8':
            reply_id = id
            break
          case '9':
            game_name_id = id
            break
          case '10':
            sponsor_id = id
            break
        }
        if (type == undefined || type == null || type == '') {
          type = 0
        }

        let addAwsKey = await AwsKey.create({
          aws_key: key,
          user_id: auth.user.id,
          post_id: post_id,
          group_id: group_id,
          chat_id: chat_id,
          chat_message_id: chat_message_id,
          game_name_id: game_name_id,
          comment_id: comment_id,
          reply_id: reply_id,
          sponsor_id: sponsor_id,
          type: type,
        })
        return addAwsKey.id
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return false
      }
    }
  }

  async update_aws_keys_entry({ auth }, aws_key_id, type, id) {
    type = String(type)
    if (auth.user) {
      try {
        let post_id = null,
          group_id = null,
          chat_id = null,
          chat_message_id = null,
          comment_id = null,
          reply_id = null,
          game_name_id = null,
          sponsor_id = null

        switch (type) {
          case '3':
            post_id = id
            break
          case '4':
            group_id = id
            break
          case '5':
            chat_id = id
            break
          case '6':
            chat_message_id = id
            break
          case '7':
            comment_id = id
            break
          case '8':
            reply_id = id
            break
          case '9':
            game_name_id = id
            break
          case '10':
            sponsor_id = id
            break
          default:
            return
        }

        let addAwsKey = await AwsKey.query()
          .where({ id: aws_key_id })
          .update({
            post_id: post_id,
            group_id: group_id,
            chat_id: chat_id,
            chat_message_id: chat_message_id,
            game_name_id: game_name_id,
            comment_id: comment_id,
            reply_id: reply_id,
            sponsor_id: sponsor_id,
            type: type,
          })

        return true
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async deleteFile({ auth, request, response }) {
    if (auth.user) {
      try {
        let key = request.input('key')

        let delete_aws_entry = await Database.table('aws_keys')
          .where({
            id: request.input('aws_key_id'),
          })
          .delete()

        s3.deleteObject(
          {
            Bucket: S3_BUCKET_DELETE,
            Key: key,
          },
          function(err, data) {
            if (data) {
              return response.status(200).json({ success: true })
            } else {
              return response.status(400).send(err)
            }
          }
        )
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async _deleteFile(key) {
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: S3_BUCKET_DELETE,
          Key: key,
        },
        function(err, data) {
          if (data) {
            resolve()
          } else {
            reject()
          }
        }
      )
    })
  }

  async deleteFile_server({ auth, request, response }) {
    if (auth.user) {
      s3.deleteObject(
        {
          Bucket: S3_BUCKET_DELETE,
          Key: request.params.key,
        },
        function(err, data) {
          if (data) {
            return response ? response.status(200).json({ success: true }) : Promise.resolve({ success: true })
          }
          return response ? response.status(400).send(err) : Promise.reject(err)
        }
      )
    }
  }

  async deleteFiles({ auth, request, response }) {
    if (auth.user) {
      var files = request.input('files')
      var bFailed = false
      for (var findex = 0; findex < files.length; findex++) {
        s3.deleteObject(
          {
            Bucket: S3_BUCKET_DELETE,
            Key: files[findex].key,
          },
          function(err, data) {
            if (!data) {
              bFailed = true
            }
          }
        )
      }

      if (bFailed) {
        return response.status(400).json({ success: false })
      } else {
        return response.status(200).json({ success: true })
      }
    }
  }
  //keep_latest use case is for when you update a image and you want to keep the latest
  //file and delete any other upload for this entry. False will delete all files for this entry
  async internal_deleteFile({ auth }, type, id, keep_latest = false) {
    type = String(type)
    if (auth.user) {
      try {
        let post_id = null,
          group_id = null,
          chat_id = null,
          chat_message_id = null,
          comment_id = null,
          reply_id = null,
          game_name_id = null,
          sponsor_id = null

        switch (type) {
          case '3':
            post_id = id
            break
          case '4':
            group_id = id
            break
          case '5':
            chat_id = id
            break
          case '6':
            chat_message_id = id
            break
          case '7':
            comment_id = id
            break
          case '8':
            reply_id = id
            break
          case '9':
            game_name_id = id
            break
          case '10':
            sponsor_id = id
            break
          default:
            return
        }

        const get_Alicia = await Database.from('aws_keys')
          .where((builder) => {
            if (post_id != null) builder.where('post_id', post_id)
            if (group_id != null) builder.where('group_id', group_id)
            if (chat_id != null) builder.where('chat_id', chat_id)
            if (chat_message_id != null) builder.where('chat_message_id', chat_message_id)
            if (comment_id != null) builder.where('comment_id', comment_id)
            if (reply_id != null) builder.where('reply_id', reply_id)
            if (game_name_id != null) builder.where('game_name_id', game_name_id)
            if (sponsor_id != null) builder.where('sponsor_id', sponsor_id)
          })
          .orderBy('created_at', 'desc')

        for (var i = 0; i < get_Alicia.length; i++) {
          if (keep_latest && i == 0) {
            continue
          }
          s3.deleteObject(
            {
              Bucket: S3_BUCKET_DELETE,
              Key: get_Alicia[i].aws_key,
            },
            function(err, data) {
              if (data) {
                console.log('done')
              } else {
                console.log(err)
              }
            }
          )

          let delete_aws_entry = await Database.table('aws_keys')
            .where({
              id: get_Alicia[i].id,
            })
            .delete()
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async isFileInfected(file) {
    try {
      const clamscan = await new NodeClam().init({
        clamdscan: {
          host: Env.get('CLAMAV_HOST'),
          port: Env.get('CLAMAV_PORT'),
        },
      })
      const { is_infected } = await clamscan.is_infected(file)
      return is_infected
    } catch (error) {
      console.error(`Failure to Scan File: ${file} - ${error}`)
      return false
    }
  }
}

module.exports = ApiController
