'use strict'

const HashTags = use('App/Models/HashTag')
const Database = use('Database')

class HashTagController {
  async store({ auth, request, response }) {
    if (auth.user) {
      if (/['/.%#$,;`\\]/.test(request.input('content'))) {
        return false
      }
      try {
        const newHashTag = await HashTags.create({
          content: request.input('content').trim(),
          user_id: auth.user.id,
        })
        return newHashTag.id
      } catch (error) {
        console.log(error)
      }
    }
  }

  async getHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('hash_tags')
        .where('content', 'like', '%' + request.input('content') + '%')
        .limit(88)

      return {
        allTags,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTopHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('hash_tags')
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

module.exports = HashTagController
