'use strict'
const Database = use('Database')
const AwsKey = use('App/Models/AwsKey')
const ApiController = use('./ApiController')
const LoggingRepository = require('../../Repositories/Logging')

class AwsKeyController {
  async addUserKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_user = await Database.from('aws_keys').where({ user_id: auth.user.id, type: request.params.type })

        for (var i = 0; i < aws_entry_for_this_user.length; i++) {
          request.params.key = aws_entry_for_this_user[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
        var delete_aws_entry_for_this_user = await Database.table('aws_keys')
          .where({
            user_id: auth.user.id,
            type: request.params.type,
          })
          .delete()

        const addAwsKey = await AwsKey.create({
          aws_key: request.input('aws_key'),
          user_id: auth.user.id,
          type: request.params.type,
        })
        return addAwsKey
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addPostKey({ auth, request, response }) {
    if (auth.user) {
      try {
        // const aws_entry_for_this_user = await Database.from('aws_keys').where({
        //   post_id: request.params.post_id,
        //   type: request.params.type,
        // })
        //
        // for (var i = 0; i < aws_entry_for_this_user.length; i++) {
        //   request.params.key = aws_entry_for_this_user[i].aws_key
        //   let remove_file = new ApiController()
        //   remove_file.deleteFile_server({ auth, request, response })
        // }
        // var delete_aws_entry_for_this_user = await Database.table('aws_keys')
        //   .where({
        //     user_id: auth.user.id,
        //     type: request.params.type,
        //   })
        //   .delete()
        var tmp_keys = request.input('file_keys')

        if (tmp_keys.length == undefined) {
          return
        }

        for (var i = 0; i < tmp_keys.length; i++) {
          let addAwsKey = await AwsKey.create({
            aws_key: tmp_keys[i],
            post_id: request.params.post_id,
            type: 3,
          })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deletePostKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_post = await Database.from('aws_keys').where({
          post_id: request.params.id,
        })

        for (var i = 0; i < aws_entry_for_this_post.length; i++) {
          request.params.key = aws_entry_for_this_post[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addCommentKey({ auth, request, response }) {
    if (auth.user) {
      try {
        var tmp_keys = request.input('file_keys')

        if (tmp_keys.length == undefined) {
          return
        }
        for (var i = 0; i < tmp_keys.length; i++) {
          let addAwsKey = await AwsKey.create({
            aws_key: tmp_keys[i],
            comment_id: request.params.comment_id,
            type: 7,
          })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deleteCommentKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_post = await Database.from('aws_keys').where({
          comment_id: request.params.id,
        })

        for (var i = 0; i < aws_entry_for_this_post.length; i++) {
          request.params.key = aws_entry_for_this_post[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addReplyKey({ auth, request, response }) {
    if (auth.user) {
      try {
        var tmp_keys = request.input('file_keys')

        if (tmp_keys.length == undefined) {
          return
        }

        for (var i = 0; i < tmp_keys.length; i++) {
          let addAwsKey = await AwsKey.create({
            aws_key: tmp_keys[i],
            reply_id: request.params.reply_id,
            type: 8,
          })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deleteReplyKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_post = await Database.from('aws_keys').where({
          reply_id: request.params.id,
        })

        for (var i = 0; i < aws_entry_for_this_post.length; i++) {
          request.params.key = aws_entry_for_this_post[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  addChatGroupProfileKey({ auth, request }) {
    if (!auth.user) return Promise.resolve('AUTH_REFUSED')
    try {
      const chat_id = request.params.chatId
      const aws_key = request.only('awsKey').awsKey
      return AwsKey.create({ aws_key, chat_id, type: 4 })
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve(error)
    }
  }

  addChatAttachmentKey({ auth, request }) {
    if (!auth.user) return Promise.resolve('AUTH_REFUSED')
    try {
      const chat_id = request.params.chatId
      const chat_message_id = request.params.messageId
      const aws_key = request.only('awsKey').awsKey
      return AwsKey.create({ aws_key, chat_id, chat_message_id, type: 5 })
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve(error)
    }
  }

  addGameIconKey({ auth, request }) {
    if (!auth.user) return Promise.resolve('AUTH_REFUSED')
    try {
      const game_name_id = request.params.gameId
      const aws_key = request.only('awsKey').awsKey
      return AwsKey.create({ aws_key, game_name_id, type: 6 })
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve(error)
    }
  }

  async removeChatGroupProfileKey(chat_id) {
    try {
      const apiController = new ApiController()
      const response = await Database.from('aws_keys').where({ chat_id, type: 4 })
      if (!response.length) return Promise.resolve()
      await apiController._deleteFile(response[0].aws_key)
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve()
    }
  }

  async removeChatAttachmentKey(chat_id, chat_message_id) {
    try {
      const apiController = new ApiController()
      if (chat_message_id) {
        const response = await Database.from('aws_keys').where({ chat_id, chat_message_id, type: 5 })
        if (!response.length) return Promise.resolve()
        await apiController._deleteFile(response[0].aws_key)
      } else {
        const response = await Database.from('aws_keys').where({ chat_id, type: 5 })
        if (!response.length) return Promise.resolve()
        await Promise.all(response.map((key) => apiController._deleteFile(key.aws_key)))
      }
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve()
    }
  }

  async removeGameIconKey(game_name_id) {
    try {
      const apiController = new ApiController()
      const { aws_key } = await Database.from('aws_keys').where({ game_name_id, type: 6 })
      await apiController._deleteFile(aws_key)
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
      return Promise.resolve()
    }
  }
}

module.exports = AwsKeyController
