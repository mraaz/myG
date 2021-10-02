'use strict'

const { log } = require('../../Common/logger')
const ProfileRepository = require('../../Repositories/Profile')
const LoggingRepository = require('../../Repositories/Logging')

class ProfileController {
  async fetchProfileInfo({ auth, params, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const alias = params.alias
      log('PROFILE', `User ${requestingUserId} requesting profile info for ${alias}`)
      const { profile } = await ProfileRepository.fetchProfileInfo({ requestingUserId, alias })
      return response.send({ profile })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async updateProfile({ auth, request, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const updates = request.all()
      log('PROFILE', `User ${requestingUserId} requesting to update profile info with ${JSON.stringify(updates)}`)
      const { profile } = await ProfileRepository.updateProfile({ requestingUserId, ...updates })

      return response.send({ profile })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
        error
      })
      return response.send({ error })
    }
  }

  async updateGame({ auth, request, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const updates = request.all()
      log('PROFILE', `User ${requestingUserId} requesting to update game info with ${JSON.stringify(updates)}`)
      const { gameExperiences } = await ProfileRepository.updateGame({ requestingUserId, ...updates })
      return response.send({ gameExperiences })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async fetchGamerSuggestions({ auth, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      log('PROFILE', `User ${requestingUserId} requesting gamer suggestions`)
      const { gamerSuggestions } = await ProfileRepository.fetchGamerSuggestions({ requestingUserId })
      return response.send({ gamerSuggestions })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async fetchDynamicFields({ auth, params, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const gameId = params.gameId
      log('PROFILE', `User ${requestingUserId} requesting dynamic fields for game ${gameId}`)
      let fields = await ProfileRepository.fetchDynamicFields({ gameId })

      //Decided to loop thru the array again. Could look into this as a refactor
      for (let index = 0; index < fields.length; index++) {
        if (fields[index].id == 'stats_header') fields.splice(index, 1)
      }

      return response.send(fields)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async commendUser({ auth, params, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const alias = params.alias
      const gameExperienceId = params.gameExperienceId
      log('PROFILE', `User ${requestingUserId} commending user ${alias} for game ${gameExperienceId}`)
      const { profile } = await ProfileRepository.commendUser({ requestingUserId, alias, gameExperienceId })

      return response.send({ profile })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async deleteGameExperience({ auth, params, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const gameExperienceId = params.gameExperienceId
      log('PROFILE', `User ${requestingUserId} deleting game experience ${gameExperienceId}`)
      const { profile } = await ProfileRepository.deleteGameExperience({ requestingUserId, gameExperienceId })
      return response.send({ profile })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }

  async fetchFriends({ auth, params, request, response }) {
    try {
      const requestingUserId = auth && auth.user && auth.user.id
      if (!requestingUserId) return
      const alias = params.alias
      const experience = request.only(['experience']).experience || ''
      const level = request.only(['level']).level || ''
      const requestedPage = parseInt(request.only(['page']).page, 10) || 'ALL'
      log(
        'PROFILE',
        `User ${requestingUserId} fetching Friends page ${requestedPage} for profile ${alias}, with experience ${experience} and level ${level}`
      )
      const { friends } = await ProfileRepository.fetchFriendsForGamer({ requestingUserId, alias, experience, level, requestedPage })
      return response.send({ friends })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ friends: [], error })
    }
  }

  async fetchGuestProfile({ params, response }) {
    try {
      const alias = params.alias
      log('PROFILE', `Guest requesting profile info for ${alias}`)
      const { profile } = await ProfileRepository.fetchGuestProfile({ alias })
      return response.send({ profile })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send({ error })
    }
  }
}

module.exports = ProfileController
