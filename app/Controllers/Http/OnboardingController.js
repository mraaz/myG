'use strict'

const User = use('App/Models/User')
const LoggingRepository = require('../../Repositories/Logging')

class OnboardingController {
  async getOnboardingStep({ auth, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const user = await User.query().where({ id: requestingUserId }).first()
      if (!user) throw new Error('User not Found')
      const step = user.toJSON().onboarding || 5
      return response.send({ step })
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

  async setOnboardingStep({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const step = parseInt(request.params.step)
      if (![0, 1, 2, 3, 4, 5].includes(step)) throw new Error('Invalid Step')
      await User.query().where({ id: requestingUserId }).update({ onboarding: step })
      return response.send({ step })
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

module.exports = OnboardingController
