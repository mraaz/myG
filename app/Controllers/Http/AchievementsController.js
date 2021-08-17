'use strict'

const AchievementsRepository = require('../../Repositories/Achievements')
const LoggingRepository = require('../../Repositories/Logging')

class AchievementsController {
  async fetchBadges({ auth, request, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const alias = request.params.alias
      const { badges, redeemedTotal, badgesTotal } = await AchievementsRepository.fetchBadges({ requestingUserId, alias })
      return response.send({ badges, redeemedTotal, badgesTotal })
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

  async redeemBadge({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const alias = request.params.alias
      const { type, value } = request.only(['type', 'value'])
      const { badges, redeemedTotal, badgesTotal } = await AchievementsRepository.redeemBadge({ requestingUserId, alias, type, value })
      return response.send({ badges, redeemedTotal, badgesTotal })
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

  async fetchDailyQuests({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.fetchDailyQuests({ requestingUserId })
      return response.send(quests)
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

  async fetchWeeklyQuests({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.fetchWeeklyQuests({ requestingUserId })
      return response.send(quests)
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

  async fetchMonthlyQuests({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.fetchMonthlyQuests({ requestingUserId })
      return response.send(quests)
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

  async registerSponsorClick({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      await AchievementsRepository.registerQuestStep({ user_id: requestingUserId, type: 'sponsor' })
      return response.send('Success')
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

  async registerAccess({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      await AchievementsRepository.registerAccess({ requestingUserId })
      return response.send('Success')
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

  async redeemDaily({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.redeemDaily({ requestingUserId })
      return response.send(quests)
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

  async redeemWeekly({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.redeemWeekly({ requestingUserId })
      return response.send(quests)
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

  async redeemMonthly({ auth, response }) {
    try {
      const requestingUserId = (auth && auth.user && auth.user.id) || null
      if (!requestingUserId) return
      const quests = await AchievementsRepository.redeemMonthly({ requestingUserId })
      return response.send(quests)
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

module.exports = AchievementsController
