'use strict'

const AchievementsRepository = require('../../Repositories/Achievements')
const LoggingRepository = require('../../Repositories/Logging')

class AchievementsController {
  async fetchBadges({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const alias = request.params.alias;
      const { badges, redeemedTotal, badgesTotal } = await AchievementsRepository.fetchBadges({ requestingUserId, alias });
      return response.send({ badges, redeemedTotal, badgesTotal })
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

  async redeemBadge({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const alias = request.params.alias;
      const { type, value } = request.only(["type", "value"]);
      const { badges, redeemedTotal, badgesTotal } = await AchievementsRepository.redeemBadge({ requestingUserId, alias, type, value });
      return response.send({ badges, redeemedTotal, badgesTotal })
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

module.exports = AchievementsController
