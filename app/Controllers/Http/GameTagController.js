'use strict'

const GameTags = use('App/Models/GameTag')
const Database = use('Database')

class GameTagController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('content'))) {
        return false
      }
      try {
        const newGameTag = await GameTags.create({
          content: request.input('content').trim(),
          user_id: auth.user.id,
        })
        return newGameTag.id
      } catch (error) {
        console.log(error)
      }
    }
  }

  async getGameTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('game_tags')
        .where('content', 'like', '%' + request.input('content') + '%')
        .limit(88)

      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTopGameTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('game_tags')
        .orderBy('counter', 'desc')
        .limit(18)

      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = GameTagController
