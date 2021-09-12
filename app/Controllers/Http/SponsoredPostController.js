'use strict'
const SponsoredPost = use('App/Models/SponsoredPost')
const SponsoredPostsTransaction = use('App/Models/SponsoredPostsTransaction')

const Database = use('Database')

const LoggingRepository = require('../../Repositories/Logging')

class SponsoredPostController {
  async update_clicks({ auth, request, response }) {
    if (auth.user) {
      try {
        const updatePost = await SponsoredPost.query()
          .where({ id: request.input('sponsoredPost_id') })
          .increment('times_clicked', 1)

        SponsoredPostsTransaction.create({
          user_id: auth.user.id,
          sponsored_posts_id: request.input('sponsoredPost_id')
        })
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = SponsoredPostController
