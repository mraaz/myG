'use strict'

const Comment = use('App/Models/Comment')
const Database = use('Database')

class CommentController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newComment = await Comment.create({
          content: request.input('content'),
          post_id: request.input('post_id'),
          schedule_games_id: request.input('schedule_games_id'),
          user_id: auth.user.id,
        })
        return newComment
      } catch (error) {
        console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }

  async show_comment({ auth, request, response }) {
    try {
      const this_comment = await Database.from('comments').where('id', '=', request.params.id)

      return {
        this_comment,
      }
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const delete_comment = await Database.table('comments')
          .where({
            id: request.params.id,
          })
          .delete()

        return delete_comment
      } catch (error) {
        console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }
}

module.exports = CommentController
