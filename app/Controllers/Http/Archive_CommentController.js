'use strict'

const Archive_Comment = use('App/Models/Archive_Comment')
const Database = use('Database')

class Archive_CommentController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newComment = await Archive_Comment.create({
          archive_comment_id: request.params.id,
          content: request.params.content,
          archive_schedule_game_id: request.params.archive_schedule_game_id,
          user_id: request.params.user_id,
          og_created_at: request.params.og_created_at,
          og_updated_at: request.params.og_updated_at,
        })
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
      const this_comment = await Database.from('comments').where(
        'id',
        '=',
        request.params.id
      )

      return {
        this_comment,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_scheduled_games({ auth, request, response }) {
    try {
      const allComments = await Database.from('archive_comments')
        .innerJoin('users', 'users.id', 'archive_comments.user_id')
        .where({ archive_schedule_game_id: request.params.id })
        .select('*', 'archive_comments.id', 'archive_comments.og_updated_at')
        .orderBy('archive_comments.og_created_at', 'desc')

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

        console.log(delete_comment)
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
      console.log(updateGame_Exp)
    }
  }

  async show_scheduled_gamesCount({ auth, request, response }) {
    try {
      const no_of_comments = await Database.from('archive_comments')
        .where({ archive_schedule_game_id: request.params.id })
        .count('* as no_of_comments')

      return {
        no_of_comments,
      }
    } catch (error) {
      console.log(no_of_comments)
    }
  }
}

module.exports = Archive_CommentController
