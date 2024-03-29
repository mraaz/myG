'use strict'

const Database = use('Database')
const Reply = use('App/Models/Reply')

const ApiController = use('./ApiController')
const NotificationController_v2 = use('./NotificationController_v2')
const LoggingRepository = require('../../Repositories/Logging')
const AchievementsRepository = require('../../Repositories/Achievements')

class ReplyController {
  async store({ auth, request }) {
    if (auth.user) {
      try {
        const thisComment = await Database.from('comments')
          .innerJoin('posts', 'posts.id', 'comments.post_id')
          .where('comments.id', '=', request.input('comment_id'))
          .select('posts.allow_comments', 'posts.id')
          .first()

        if (thisComment == undefined || thisComment.allow_comments == false) return

        let newReply = await Reply.create({
          user_id: auth.user.id,
          comment_id: request.input('comment_id'),
          content: request.input('content'),
          media_url: request.input('media_url')
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

        await AchievementsRepository.registerQuestStep({ user_id: auth.user.id, type: 'post' })
        return newReply
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

  async show({ auth, request, response }) {
    try {
      let do_I_like_this_comment = undefined
      let no_of_likes = undefined

      const this_comments_replies = await Database.from('replies')
        .innerJoin('users', 'users.id', 'replies.user_id')
        .where('replies.comment_id', '=', request.params.id)
        .select('*', 'replies.id', 'replies.updated_at')
        .orderBy('replies.created_at', 'desc')
        .limit(50)

      const no_of_replies = await Database.from('replies').where({ comment_id: request.params.id }).count('* as no_of_replies')

      if (auth.user) {
        const return_variable = await this.show_comments_likes({ auth }, request.params.id)
        do_I_like_this_comment = return_variable.do_I_like_this_comment
        no_of_likes = return_variable.no_of_likes
      }

      return {
        this_comments_replies,
        no_of_replies: no_of_replies,
        do_I_like_this_comment,
        no_of_likes: no_of_likes
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

  async show_comments_likes({ auth }, comment_id) {
    try {
      const do_I_like_this_comment = await Database.from('likes')
        .where({ comment_id: comment_id, user_id: auth.user.id })
        .count('* as myOpinion')

      const no_of_likes = await Database.from('likes').where({ comment_id: comment_id }).count('* as no_of_likes')

      return {
        do_I_like_this_comment,
        no_of_likes: no_of_likes
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

  async show_reply({ auth, request, response }) {
    try {
      const this_reply = await Database.from('replies').where('id', '=', request.params.id)

      return {
        this_reply
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

  async replies_count({ auth, request, response }) {
    try {
      const no_of_my_replies = await Database.from('replies')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_replies')

      return {
        no_of_my_replies
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
        const security_check = await Database.from('replies').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        const apiController = new ApiController()
        await apiController.internal_deleteFile({ auth }, '8', request.params.id)

        const delete_reply = await Database.table('replies')
          .where({
            id: request.params.id
          })
          .delete()

        await AchievementsRepository.unregisterQuestStep({ user_id: auth.user.id, type: 'post' })
        return 'Done'
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

  async update({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('replies').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

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
          message: (error && error.message) || error
        })
      }
    }
  }
}

module.exports = ReplyController
