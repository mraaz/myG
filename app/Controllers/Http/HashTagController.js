'use strict'

const HashTags = use('App/Models/HashTag')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class HashTagController {
  async store({ auth }, content) {
    if (auth.user) {
      // if (/['/.%#$,;`\\]/.test(request.input('content'))) {
      //   return false
      // }
      try {
        const newHashTag = await HashTags.create({
          content: content.trim(),
          user_id: auth.user.id
        })
        return newHashTag.id
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          const newHashTag = await Database.table('hash_tags').where({ content: content.trim() }).first()

          return newHashTag.id
        }

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

  async getHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('hash_tags')
        .where('content', 'like', '%' + request.input('content') + '%')
        .limit(88)

      return {
        allTags
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

  async getTopHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('hash_tags').orderBy('counter', 'desc').limit(18)

      return {
        allTags
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

  async getMatchingHashTags({ auth, request, response }) {
    try {
      const tags = request.input('content')
      const allMatchingTags = await Database.table('hash_tags').whereIn('content', tags).limit(88)

      return {
        allMatchingTags
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

module.exports = HashTagController
