'use strict'

const AWS = require('aws-sdk')
const Env = use('Env')
const fs = require('fs')
const Helpers = use('Helpers')
const fileType = require('file-type')
const bluebird = require('bluebird')
const User = use('App/Models/User')
const ChatMessage = use('App/Models/ChatMessage')
const NodeClam = require('clamscan')

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
      }
    } else {
      return {
        userInfo: 1981,
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
        const data = await uploadFile(bucket, buffer, tmpfilename, type)
        fs.unlinkSync(tmpfilepath)
        return response.status(200).json(data)
      } catch (error) {
        return response.status(400).json(error)
      }
    }
  }

  async deleteFile({ auth, request, response }) {
    if (auth.user) {
      var key = request.input('key')
      s3.deleteObject(
        {
          Bucket: S3_BUCKET_DELETE,
          Key: key,
        },
        function (err, data) {
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
        function (err, data) {
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
        function (err, data) {
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
          function (err, data) {
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
