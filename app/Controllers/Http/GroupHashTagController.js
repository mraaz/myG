'use strict'

const GroupHashTag = use('App/Models/GroupHashTag')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class GroupHashTagController {
  async store({ auth }, content) {
    if (auth.user) {
      try {
        const newGrpTag = await GroupHashTag.create({
          content: content.trim(),
          user_id: auth.user.id,
        })
        return newGrpTag.id
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          const newGrpTag = await Database.table('group_hash_tags')
            .where({ content: content.trim() })
            .first()

          return newGrpTag.id
        }
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async getHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('group_hash_tags')
        .where('content', 'like', '%' + request.input('content') + '%')
        .limit(88)

      return {
        allTags,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async getTopHashTags({ auth, request, response }) {
    try {
      const allTags = await Database.table('group_hash_tags')
        .orderBy('counter', 'desc')
        .limit(18)

      return {
        allTags,
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }
}

module.exports = GroupHashTagController
