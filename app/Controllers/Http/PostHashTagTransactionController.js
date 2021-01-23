'use strict'
const PostHashTagTransaction = use('App/Models/PostHashTagTransaction')
const LoggingRepository = require('../../Repositories/Logging')

class PostHashTagTransactionController {
  async store({ auth }, post_id, hash_tag_id) {
    if (auth.user) {
      try {
        const create_arrTags = PostHashTagTransaction.create({
          post_id: post_id,
          hash_tag_id: hash_tag_id,
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

module.exports = PostHashTagTransactionController
