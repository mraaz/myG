'use strict'

const AWS = require('aws-sdk')
const Env = use('Env')
const fs = require('fs')
const Helpers = use('Helpers')
const fileType = require('file-type')
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
        featuresOn: process.env.FEATURES_ON,
      }
    } else {
      return {
        userInfo: 1981,
        port: process.env.PORT,
        logsOn: process.env.LOGS_ON,
        featuresOn: process.env.FEATURES_ON,
      }
    }
  }

  async uploadFile({ auth, request, response }) {
    if (auth.user) {
      const isChat = !!request.input('chat')

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
      const bucket = isChat ? S3_BUCKET_CHAT : S3_BUCKET

      const timestamp_OG = Date.now().toString()
      var tmpfilename = auth.user.id + '_' + timestamp_OG + '_' + generateRandomString(6) + '_' + filename
      //var tmpfilepath = Helpers.tmpPath('uploads') + '\\' + tmpfilename; FOR WINDOWS ONLY
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
        const type = fileType(buffer)
        const timestamp = Date.now().toString()
        //const fileName = timestamp + '_' + generateRandomString(6) + '_' + filename
        let data = await uploadFile(bucket, buffer, tmpfilename, type)
        fs.unlinkSync(tmpfilepath)
        data.aws_key_id = await this.create_aws_keys_entry({ auth }, data.Key, request.input('type'), request.input('id'))

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

  async create_aws_keys_entry({ auth }, key, type, id) {
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
          game_name_id = null

        switch (type) {
          case '1':
            const update_profile_img = await User.query()
              .where({ id: auth.user.id })
              .update({ profile_img: key })
            break
          case '2':
            const update_bg_img = await User.query()
              .where({ id: auth.user.id })
              .update({ profile_bg: key })
            break
          case '3':
            post_id = id
            break
          case '4':
            group_id = id
            if (id != undefined || id != null) {
              const update_img = await Group.query()
                .where({ id: request.input('group_id') })
                .update({ group_img: key })
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
        }
        if (type == undefined || type == null) {
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
    if (auth.user) {
      console.log('number 8')
      try {
        let post_id = null,
          group_id = null,
          chat_id = null,
          chat_message_id = null,
          comment_id = null,
          reply_id = null,
          game_name_id = null

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
          default:
            return
        }
        console.log('doing maginc')
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
            type: type,
          })

        return true
      } catch (error) {
        console.log(error)
      }
    }
  }

  async deleteFile({ auth, request, response }) {
    if (auth.user) {
      let key = request.input('key')

      var delete_aws_entry = await Database.table('aws_keys')
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
            return response.status(200).json({ success: true })
          } else {
            return response.status(400).send(err)
          }
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
