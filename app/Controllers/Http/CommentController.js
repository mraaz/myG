'use strict'

const Comment = use('App/Models/Comment')
const Database = use('Database')
const AwsKeyController = use('./AwsKeyController')
const NotificationController_v2 = use('./NotificationController_v2')
const LoggingRepository = require('../../Repositories/Logging')

class CommentController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        let newComment = await Comment.create({
          content: request.input('content'),
          post_id: request.input('post_id'),
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
          media_url: request.input('media_url'),
        })

        if (request.input('file_keys') != undefined && request.input('file_keys') != null && request.input('file_keys').length != 0) {
          let update_key = new AwsKeyController()
          request.params.comment_id = newComment.id
          update_key.addCommentKey({ auth, request, response })
        }

        //Get post owner or game owner and then create notification
        let noti = new NotificationController_v2()
        if (request.input('post_id') != undefined && request.input('post_id') != null) {
          const getPostOwner = await Database.from('posts')
            .where({ id: request.input('post_id') })
            .first()

          if (getPostOwner != undefined) {
            if (auth.user.id != getPostOwner.user_id) {
              noti.addComment({ auth }, request.input('post_id'), getPostOwner.user_id, newComment.id)
            }
          }
        }

        if (request.input('schedule_games_id') != undefined && request.input('schedule_games_id') != null) {
          const getPostOwner = await Database.from('posts')
            .where({ schedule_games_id: request.input('schedule_games_id') })
            .first()

          if (getPostOwner != undefined) {
            if (auth.user.id != getPostOwner.user_id) {
              noti.addComment({ auth }, getPostOwner.id, getPostOwner.user_id, newComment.id)
            }
          }
        }

        newComment = await Database.from('comments')
          .innerJoin('users', 'users.id', 'comments.user_id')
          .where('comments.id', '=', newComment.id)
          .select('comments.*', 'users.alias', 'users.profile_img')

        return newComment
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
      const allComments = await Database.from('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .where({ post_id: request.params.id })
        .select('*', 'comments.id', 'comments.updated_at')
        .orderBy('comments.created_at', 'desc')

      return {
        allComments,
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

  async comments_count({ auth, request, response }) {
    try {
      const no_of_my_comments = await Database.from('comments')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_comments')

      return {
        no_of_my_comments,
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

  async show_comment({ auth, request, response }) {
    try {
      const this_comment = await Database.from('comments').where('id', '=', request.params.id)

      return {
        this_comment,
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

  async show_scheduled_games({ auth, request, response }) {
    try {
      const allComments = await Database.from('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .where('schedule_games_id', '=', request.params.id)
        .select('*', 'comments.id', 'comments.updated_at')
        .orderBy('comments.created_at', 'desc')

      return {
        allComments,
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

  async get_right_card_comment_info({ auth, request, response }) {
    try {
      const lastComment = await Database.from('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .where('schedule_games_id', '=', request.params.id)
        .select('comments.*', 'users.profile_img', 'users.alias', 'comments.id', 'comments.updated_at')
        .orderBy('comments.created_at', 'desc')
        .first()

      const no_of_comments = await Database.from('comments')
        .where('schedule_games_id', '=', request.params.id)
        .count('* as no_of_my_comments')
      return {
        lastComment,
        no_of_comments,
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
        await delete_files.deleteCommentKey({ auth, request, response })

        const delete_comment = await Database.table('comments')
          .where({
            id: request.params.id,
          })
          .delete()

        return delete_comment
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
      const updateComment = await Comment.query()
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

  async show_scheduled_gamesCount({ auth, request, response }) {
    try {
      const no_of_comments = await Database.from('comments')
        .where({ schedule_games_id: request.params.id })
        .count('* as no_of_comments')

      return {
        no_of_comments,
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

module.exports = CommentController
