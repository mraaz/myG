'use strict'

const { log } = require('../../Common/logger')
const ProfileRepository = require('../../Repositories/Profile')
const LoggingRepository = require('../../Repositories/Logging')

class ProfileController {
  async fetchProfileInfo({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
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
        message: (error && error.message) || error,
      })
      return response.send({ error })
    }

  }
}

module.exports = ProfileController
