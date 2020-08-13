'use strict'

const GroupHashTagTran = use('App/Models/GroupHashTagTran')
const LoggingRepository = require('../../Repositories/Logging')

class GroupHashTagTranController {
  async store({ auth }, group_id, hash_tag_id) {
    if (auth.user) {
      try {
        const create_arrTags = GroupHashTagTran.create({
          group_id: group_id,
          group_hash_tag_id: hash_tag_id,
        })
        return
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
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
}

module.exports = GroupHashTagTranController
