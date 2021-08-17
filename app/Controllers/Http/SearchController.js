'use strict'

const { log } = require('../../Common/logger')
const SearchRepository = require('../../Repositories/Search')
const LoggingRepository = require('../../Repositories/Logging')

class SearchController {
  async searchGamers({ auth, request, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      const { query, online, from, size } = request.only(['query', 'online', 'from', 'size'])
      log('PROFILE', `User ${requestingUserId ? requestingUserId : "Guest"} searching gamer with ${query}`)
      const { gamers, total } = await SearchRepository.searchGamers({ requestingUserId, query, online, from, size })
      return response.send({ gamers, total })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        error,
      })
      return response.send({ error })
    }
  }
}

module.exports = SearchController
