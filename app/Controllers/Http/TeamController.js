'use strict'

const { log } = require('../../Common/logger')
const TeamRepository = require('../../Repositories/Team')
const LoggingRepository = require('../../Repositories/Logging')

class TeamController {
  async createTeam({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const payload = request.only([
        'name',
        'games',
        'image',
        'hashtags',
        'moderators',
        'type',
        'region',
        'language',
        'description',
        'autoAcceptGamers',
        'listOnLFT',
        'recruiting',
        'exclusive',
        'invitationOnly',
        'invitedFriends'
      ])
      log('TEAM', `User ${requestingUserId} creating Team with ${JSON.stringify(payload)}`)
      const team = await TeamRepository.createTeam({ ...payload, requestingUserId })
      return response.send(team)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      response.status(500)
      return response.send(error.message)
    }
  }

  async fetchTeams({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const filterByRequestingUser = request.only('filterByRequestingUser').filterByRequestingUser
      return response.send(await TeamRepository.fetchTeams({ requestingUserId, filterByRequestingUser }))
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      response.status(500)
      return response.send(error.message)
    }
  }

  async fetchTeamTags({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const input = request.params.input
      log('TEAM', `User ${requestingUserId} requesting team tags with ${input}`)
      const tags = await TeamRepository.fetchTeamTags(input)
      return response.send(tags)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      response.status(500)
      return response.send(error.message)
    }
  }
}

module.exports = TeamController
