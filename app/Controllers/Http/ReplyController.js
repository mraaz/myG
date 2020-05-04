'use strict'

const Database = use('Database')
const Reply = use('App/Models/Reply')

class ReplyController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newReply = await Reply.create({
          user_id: auth.user.id,
          comment_id: request.input('comment_id'),
          content: request.input('content'),
          media_url: request.input('media_url'),
        })
        return newReply
      } catch (error) {
        console.log(error)
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
      console.log(error)
    }
  }

  async show_reply({ auth, request, response }) {
    try {
      const this_reply = await Database.from('replies').where('id', '=', request.params.id)

      return {
        this_reply,
      }
    } catch (error) {
      console.log(error)
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
      console.log(error)
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

        console.log(delete_reply)
        return delete_reply
      } catch (error) {
        console.log(error)
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
      console.log(updateGame_Exp)
    }
  }
}

module.exports = ReplyController
