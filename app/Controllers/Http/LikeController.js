'use strict'

const Database = use('Database')
const Like = use('App/Models/Like')
const UserStatTransactionController = use('./UserStatTransactionController')

class LikeController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newLike = await Like.create({
          user_id: auth.user.id,
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          reply_id: request.input('reply_id'),
        })

        let userStatController = new UserStatTransactionController()

        if (request.input('post_id') != undefined) {
          const post_owner = await Database.from('posts')
            .where({ id: request.input('post_id') })
            .select('user_id')
            .first()

          if (post_owner != undefined) {
            userStatController.update_total_number_of(post_owner.user_id, 'total_number_of_likes')
          }
        }

        if (request.input('comment_id') != undefined) {
          const comment_owner = await Database.from('comments')
            .where({ id: request.input('comment_id') })
            .select('user_id')
            .first()

          if (comment_owner != undefined) {
            userStatController.update_total_number_of(comment_owner.user_id, 'total_number_of_likes')
          }
        }

        if (request.input('reply_id') != undefined) {
          const reply_owner = await Database.from('replies')
            .where({ id: request.input('reply_id') })
            .select('user_id')
            .first()

          if (reply_owner != undefined) {
            userStatController.update_total_number_of(reply_owner.user_id, 'total_number_of_likes')
          }
        }

        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }
  async show({ auth, request, response }) {
    try {
      const number_of_likes = await Database.from('likes')
        .where('post_id', '=', request.params.id)
        .count('* as total')

      const name_of_1st_admirer = await Database.from('likes')
        .innerJoin('users', 'users.id', 'likes.user_id')
        .where('likes.post_id', '=', request.params.id)
        .select('likes.id', 'users.alias')
        .orderBy('likes.id', 'asc')
        .first()

      //const do_I_like_it = await Database.from('likes').where('post_id', '=', request.params.id, 'user_id', '=', auth.user.id )
      const do_I_like_it = await Database.from('likes')
        .where({ post_id: request.params.id, user_id: auth.user.id })
        .count('* as myOpinion')

      const no_of_comments = await Database.from('comments')
        .where({ post_id: request.params.id })
        .count('* as no_of_comments')

      return {
        number_of_likes,
        admirer_UserInfo: name_of_1st_admirer,
        do_I_like_it: do_I_like_it,
        no_of_comments: no_of_comments,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_comments({ auth, request, response }) {
    try {
      const do_I_like_this_comment = await Database.from('likes')
        .where({ comment_id: request.params.id, user_id: auth.user.id })
        .count('* as myOpinion')

      const no_of_likes = await Database.from('likes')
        .where({ comment_id: request.params.id })
        .count('* as no_of_likes')

      return {
        do_I_like_this_comment,
        no_of_likes: no_of_likes,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_replies({ auth, request, response }) {
    try {
      const do_I_like_this_reply = await Database.from('likes')
        .where({ reply_id: request.params.id, user_id: auth.user.id })
        .count('* as myOpinion')

      const no_of_likes = await Database.from('likes')
        .where({ reply_id: request.params.id })
        .count('* as no_of_likes')

      return {
        do_I_like_this_reply,
        no_of_likes: no_of_likes,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_like = await Database.table('likes')
          .where({
            post_id: request.params.id,
            user_id: auth.user.id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()

        const post_owner = await Database.from('posts')
          .where({ id: request.params.id })
          .select('user_id')
          .first()

        if (post_owner != undefined) {
          userStatController.update_total_number_of(post_owner.user_id, 'total_number_of_likes')
        }

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
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
            user_id: auth.user.id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()

        const comment_owner = await Database.from('comments')
          .where({ id: request.params.id })
          .select('user_id')
          .first()

        if (comment_owner != undefined) {
          userStatController.update_total_number_of(comment_owner.user_id, 'total_number_of_likes')
        }

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
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
            user_id: auth.user.id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()

        const reply_owner = await Database.from('replies')
          .where({ id: request.params.id })
          .select('user_id')
          .first()

        if (reply_owner != undefined) {
          userStatController.update_total_number_of(reply_owner.user_id, 'total_number_of_likes')
        }

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async getthisLike({ auth, request, response }) {
    try {
      const getthisLike = await Database.from('likes').where('id', '=', request.params.id)

      return {
        getthisLike,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = LikeController
