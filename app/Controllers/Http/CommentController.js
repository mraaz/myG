'use strict'

const Comment = use('App/Models/Comment')
const Database = use('Database')

const ApiController = use('./ApiController')
const NotificationController_v2 = use('./NotificationController_v2')
const LoggingRepository = require('../../Repositories/Logging')
const AchievementsRepository = require('../../Repositories/Achievements')

class CommentController {
  async store({ auth, request }) {
    if (auth.user) {
      try {
        const thisPost = await Database.from('posts')
          .where({ id: request.input('post_id') })
          .first()

        if (thisPost == undefined || thisPost.allow_comments == false) return

        let newComment = await Comment.create({
          content: request.input('content'),
          post_id: request.input('post_id'),
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
          media_url: request.input('media_url')
        })

        let tmpArr = request.input('aws_key_id')

        if (tmpArr != undefined && tmpArr.length > 0) {
          const apiController = new ApiController()
          for (let i = 0; i < tmpArr.length; i++) {
            await apiController.update_aws_keys_entry({ auth }, tmpArr[i], '7', newComment.id)
          }
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

        await AchievementsRepository.registerQuestStep({ user_id: auth.user.id, type: 'post' })
        return newComment
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async show({ request }) {
    try {
      const allPinnedComments = await Database.from('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .innerJoin('posts', 'posts.id', 'comments.post_id')
        .where({ post_id: request.params.id })
        .where({ pinned: true })
        .select('comments.*', 'users.*', 'posts.user_id as post_user_id', 'comments.id', 'comments.updated_at')
        .orderBy('comments.pinned_date', 'asc')
        .limit(50)

      const allNonPinnedComments = await Database.from('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .innerJoin('posts', 'posts.id', 'comments.post_id')
        .leftJoin('likes', 'likes.comment_id', 'comments.id')
        .where('comments.post_id', '=', request.params.id, 'comments.pinned', '=', false)
        .select('comments.*', 'users.*', 'posts.user_id as post_user_id', 'comments.id', 'comments.updated_at')
        .groupBy('comments.id')
        .count('* as no_of_likes')
        .orderBy('no_of_likes', 'desc')
        .orderBy('comments.updated_at', 'desc')
        .limit(50)


      //const newArr = await allPinnedComments.concat(allComments)
      const allComments = [...allPinnedComments, ...allNonPinnedComments]

      return { allComments, pinned_total: allPinnedComments.length }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async comments_count({ auth, request }) {
    try {
      const no_of_my_comments = await Database.from('comments')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_comments')

      return {
        no_of_my_comments
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async show_comment({ auth, request, response }) {
    try {
      const this_comment = await Database.from('comments').where('id', '=', request.params.id)

      return {
        this_comment
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
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
        allComments
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
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
        no_of_comments
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('comments').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        const apiController = new ApiController()
        await apiController.internal_deleteFile({ auth }, '7', request.params.id)

        const delete_comment = await Database.table('comments')
          .where({
            id: request.params.id
          })
          .delete()

        await AchievementsRepository.unregisterQuestStep({ user_id: auth.user.id, type: 'post' })
        return
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async update({ auth, request }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('comments').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        await Comment.query()
          .where({ id: request.params.id })
          .update({ content: request.input('content') })

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async show_scheduled_gamesCount({ auth, request, response }) {
    try {
      const no_of_comments = await Database.from('comments').where({ schedule_games_id: request.params.id }).count('* as no_of_comments')

      return {
        no_of_comments
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async pin_status({ auth, request }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('comments')
          .innerJoin('posts', 'posts.id', 'comments.post_id')
          .select('posts.user_id')
          .where('comments.id', '=', request.params.id)
          .first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        await Comment.query()
          .where({ id: request.params.id })
          .update({ pinned: request.params.status == 'true' ? true : false, pinned_date: new Date() })

        return 'Saved successfully'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }
}

module.exports = CommentController
