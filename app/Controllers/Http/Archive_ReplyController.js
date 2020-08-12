'use strict'

const Database = use('Database')
const Archive_Reply = use('App/Models/Archive_Reply')
const LoggingRepository = require('../../Repositories/Logging')

class Archive_ReplyController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newReply = await Archive_Reply.create({
          content: request.params.content,
          archive_comment_id: request.params.archive_comment_id,
          user_id: request.params.user_id,
          og_created_at: request.params.og_created_at,
          og_updated_at: request.params.og_updated_at,
        })
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
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
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
    }
  }

  async show_reply({ auth, request, response }) {
    try {
      const this_reply = await Database.from('replies').where('id', '=', request.params.id)

      return {
        this_reply,
      }
    } catch (error) {
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
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
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_reply = await Database.table('replies')
          .where({
            id: request.params.id,
          })
          .delete()

        return delete_reply
      } catch (error) {
        LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
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
      LoggingRepository.log({ environment: process.env.NODE_ENV, type: 'error', source: 'backend', context: __filename, message: error && error.message || error })
    }
  }
}

module.exports = Archive_ReplyController
