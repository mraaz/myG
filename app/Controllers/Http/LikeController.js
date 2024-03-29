'use strict'

const Database = use('Database')
const Like = use('App/Models/Like')
const UserStatTransactionController = use('./UserStatTransactionController')
const NotificationController_v2 = use('./NotificationController_v2')
const AchievementsRepository = require('../../Repositories/Achievements')
const LoggingRepository = require('../../Repositories/Logging')

class LikeController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newLike = await Like.create({
          user_id: auth.user.id,
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          reply_id: request.input('reply_id')
        })
        await AchievementsRepository.registerQuestStep({ user_id: auth.user.id, type: 'like' })

        const userStatController = new UserStatTransactionController()

        if (request.input('post_id') != undefined) {
          const post_owner = await Database.from('posts')
            .where({ id: request.input('post_id') })
            .select('user_id', 'schedule_games_id', 'id')
            .first()

          if (post_owner != undefined) {
            userStatController.update_total_number_of(post_owner.user_id, 'total_number_of_likes')

            if (post_owner.user_id != auth.user.id) {
              let noti = new NotificationController_v2()
              await noti.addPostLike({ auth }, post_owner.id, post_owner.user_id)
            }
          }
        }

        if (request.input('comment_id') != undefined) {
          const comment_owner = await Database.from('comments')
            .where({ id: request.input('comment_id') })
            .select('user_id', 'schedule_games_id', ' post_id')
            .first()

          if (comment_owner != undefined) {
            userStatController.update_total_number_of(comment_owner.user_id, 'total_number_of_likes')

            if (comment_owner.user_id != auth.user.id) {
              let noti = new NotificationController_v2()

              if (comment_owner.schedule_games_id != null) {
                noti.addCommentLike({ auth }, null, comment_owner.user_id, request.input('comment_id'), comment_owner.schedule_games_id)
              } else if (comment_owner.post_id != null) {
                noti.addCommentLike({ auth }, comment_owner.post_id, comment_owner.user_id, request.input('comment_id'), null)
              }
            }
          }
        }

        if (request.input('reply_id') != undefined) {
          const reply_owner = await Database.from('replies')
            .innerJoin('comments', 'comments.id', 'replies.comment_id')
            .where('replies.id', '=', request.input('reply_id'))
            .select('replies.user_id', 'schedule_games_id', ' post_id')
            .first()

          if (reply_owner != undefined) {
            userStatController.update_total_number_of(reply_owner.user_id, 'total_number_of_likes')

            if (reply_owner.user_id != auth.user.id) {
              const noti = new NotificationController_v2()

              if (reply_owner.schedule_games_id != null) {
                noti.addReplyLike({ auth }, null, reply_owner.user_id, request.input('reply_id'), reply_owner.schedule_games_id)
              } else if (reply_owner.post_id != null) {
                noti.addReplyLike({ auth }, reply_owner.post_id, reply_owner.user_id, request.input('reply_id'), null)
              }
            }
          }
        }

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

  async show({ auth }, post_id) {
    let do_I_like_it = undefined
    let no_of_comments = undefined

    try {
      const number_of_likes = await Database.from('likes').where('post_id', '=', post_id).count('* as total')

      const name_of_1st_admirer = await Database.from('likes')
        .innerJoin('users', 'users.id', 'likes.user_id')
        .where('likes.post_id', '=', post_id)
        .select('likes.id', 'users.alias')
        .orderBy('likes.id', 'asc')
        .first()

      if (auth.user && auth.user != -1) {
        do_I_like_it = await Database.from('likes').where({ post_id: post_id, user_id: auth.user.id }).count('* as myOpinion')

        no_of_comments = await Database.from('comments').where({ post_id: post_id }).count('* as no_of_comments')
      }

      return {
        number_of_likes,
        admirer_UserInfo: name_of_1st_admirer,
        do_I_like_it: do_I_like_it,
        no_of_comments: no_of_comments
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

  async show_comments({ auth, request, response }) {
    let do_I_like_this_comment = undefined
    let no_of_likes = undefined

    if (auth.user && auth.user != -1) {
      try {
        do_I_like_this_comment = await Database.from('likes')
          .where({ comment_id: request.params.id, user_id: auth.user.id })
          .count('* as myOpinion')

        no_of_likes = await Database.from('likes').where({ comment_id: request.params.id }).count('* as no_of_likes')
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
      return {
        do_I_like_this_comment,
        no_of_likes: no_of_likes
      }
    }
  }

  async show_replies({ auth, request, response }) {
    let do_I_like_this_reply = undefined
    let no_of_likes = undefined

    if (auth.user) {
      try {
        do_I_like_this_reply = await Database.from('likes')
          .where({ reply_id: request.params.id, user_id: auth.user.id })
          .count('* as myOpinion')

        no_of_likes = await Database.from('likes').where({ reply_id: request.params.id }).count('* as no_of_likes')
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
    return {
      do_I_like_this_reply,
      no_of_likes: no_of_likes
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_like = await Database.table('likes')
          .where({
            post_id: request.params.id,
            user_id: auth.user.id
          })
          .delete()

        await AchievementsRepository.unregisterQuestStep({ user_id: auth.user.id, type: 'like' })

        const userStatController = new UserStatTransactionController()

        const post_owner = await Database.from('posts').where({ id: request.params.id }).select('user_id').first()

        if (post_owner != undefined) {
          userStatController.update_total_number_of(post_owner.user_id, 'total_number_of_likes')

          const noti = new NotificationController_v2()
          noti.deletePostLike({ auth }, request.params.id)
        }

        return 'Deleted successfully'
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

  async destroy_comment({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_like = await Database.table('likes')
          .where({
            comment_id: request.params.id,
            user_id: auth.user.id
          })
          .delete()

        const userStatController = new UserStatTransactionController()

        const comment_owner = await Database.from('comments').where({ id: request.params.id }).select('user_id').first()

        if (comment_owner != undefined) {
          userStatController.update_total_number_of(comment_owner.user_id, 'total_number_of_likes')

          const noti = new NotificationController_v2()
          noti.deleteCommentLike({ auth }, request.params.id)
        }

        return 'Deleted successfully'
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

  async destroy_reply({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_reply_like = await Database.table('likes')
          .where({
            reply_id: request.params.id,
            user_id: auth.user.id
          })
          .delete()

        const userStatController = new UserStatTransactionController()

        const reply_owner = await Database.from('replies').where({ id: request.params.id }).select('user_id').first()

        if (reply_owner != undefined) {
          userStatController.update_total_number_of(reply_owner.user_id, 'total_number_of_likes')

          const noti = new NotificationController_v2()
          noti.deleteReplyLike({ auth }, request.params.id)
        }

        return 'Deleted successfully'
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

  async getthisLike({ auth, request, response }) {
    try {
      const getthisLike = await Database.from('likes').where('id', '=', request.params.id)

      return {
        getthisLike
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
}

module.exports = LikeController
