'use strict'

const Database = use('Database')
const Reply = use('App/Models/Reply')

const ApiController = use('./ApiController')
const NotificationController_v2 = use('./NotificationController_v2')
const LoggingRepository = require('../../Repositories/Logging')

class ReplyController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        let newReply = await Reply.create({
          user_id: auth.user.id,
          comment_id: request.input('comment_id'),
          content: request.input('content'),
          media_url: request.input('media_url'),
        })

        let tmpArr = request.input('aws_key_id')

        if (tmpArr != undefined && tmpArr.length > 0) {
          const apiController = new ApiController()
          for (let i = 0; i < tmpArr.length; i++) {
            const alicia_key = await apiController.update_aws_keys_entry({ auth }, tmpArr[i], '8', newReply.id)
          }
        }

        //Get post owner or game owner and then create notification
        let noti = new NotificationController_v2()
        const getPostOwner = await Database.from('comments')
          .where({ id: request.input('comment_id') })
          .first()

        if (getPostOwner != undefined) {
          if (auth.user.id != getPostOwner.user_id) {
            noti.addReply({ auth }, getPostOwner.post_id, getPostOwner.user_id, newReply.id)
          }
        }

        newReply = await Database.from('replies')
          .innerJoin('users', 'users.id', 'replies.user_id')
          .where('replies.id', '=', newReply.id)
          .select('replies.*', 'users.alias', 'users.profile_img')

        return newReply
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

  async show({ auth, request, response }) {
    try {
      const this_comments_replies = await Database.from('replies')
        .innerJoin('users', 'users.id', 'replies.user_id')
        .where('replies.comment_id', '=', request.params.id)
        .select('*', 'replies.id', 'replies.updated_at')
        .orderBy('replies.created_at', 'desc')

      const no_of_replies = await Database.from('replies')
        .where({ comment_id: request.params.id })
        .count('* as no_of_replies')

      return {
        this_comments_replies,
        no_of_replies: no_of_replies,
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

  async show_reply({ auth, request, response }) {
    try {
      const this_reply = await Database.from('replies').where('id', '=', request.params.id)

      return {
        this_reply,
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

  async replies_count({ auth, request, response }) {
    try {
      const no_of_my_replies = await Database.from('replies')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_replies')

      return {
        no_of_my_replies,
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

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        let delete_files = new AwsKeyController()
        await delete_files.deleteReplyKey({ auth, request, response })

        const delete_reply = await Database.table('replies')
          .where({
            id: request.params.id,
          })
          .delete()

        return delete_reply
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async update({ auth, request, response }) {
    try {
      const updateReply = await Reply.query()
        .where({ id: request.params.id })
        .update({ content: request.input('content') })
      return 'Saved successfully'
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

module.exports = ReplyController
