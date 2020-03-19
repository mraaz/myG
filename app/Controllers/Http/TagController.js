'use strict'

const Tags = use('App/Models/Tag')
const Database = use('Database')

class TagController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newGameTag = await Tags.create({
          game_names_id: request.input('game_names_id'),
          tag: request.input('tag').trim(),
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async store_backend({ auth, request, response }) {
    if (auth.user) {
      try {
        const newGameTag = await Tags.create({
          game_names_id: request.params.game_names_id,
          tag: request.params.tag.trim(),
        })
        return newGameTag
      } catch (error) {
        console.log(error)
      }
    }
  }

  async show({ auth, request, response }) {
    try {
      const allTags = await Tags.query().fetch()
      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTagsforGames({ auth, request, response }) {
    try {
      const allTags = await Database.table('tags')
        .where('game_names_id', '=', request.input('game_names_id'))
        .where('tag', 'like', '%' + request.input('inputValue') + '%')
        .limit(88)

      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTopTagsforGames({ auth, request, response }) {
    try {
      const allTags = await Database.table('tags')
        .where('game_names_id', '=', request.input('game_names_id'))
        .orderBy('counter', 'desc')
        .limit(18)

      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }

  // async show2({ auth, request, response }) {
  //   try {
  //     const allTags = await Tags.query()
  //       .where('game_names_id', '=', request.params.id)
  //       .fetch()
  //     //const allTags = await Tags.query().fetch()
  //     return {
  //       allTags,
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

module.exports = TagController
