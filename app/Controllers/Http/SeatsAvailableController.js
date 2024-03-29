'use strict'

const { getIp } = require('../../Common/ip')
const RedisRepository = require('../../Repositories/Redis')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const SeatsAvailableEmail = use('App/Models/SeatsAvailableEmail')

const LoggingRepository = require('../../Repositories/Logging')
const EncryptionRepository = require('../../Repositories/Encryption')

const Database = use('Database')

class SeatsAvailableController {
  async fetchSeatsAvailable({ response }) {
    const seatsAvailable = ((await SeatsAvailable.query().first()) || { toJSON: () => ({}) }).toJSON().seats_available || 0
    return response.send(seatsAvailable)
  }

  async checkExtraSeatsCode({ req, params, response }) {
    try {
      const ip = getIp(req)
      const failedAttempts = await RedisRepository.getRecentFailedLoginAttempts(ip)
      if (failedAttempts > 5) return response.send('LIMIT_EXCEEED')
      const code = params.code
      const hasCode = await ExtraSeatsCodes.query().where('code', code).select('*').first()
      if (hasCode == undefined) {
        await RedisRepository.registerFailedLoginAttempt(ip)
        return response.send('false')
      } else {
        const counter = parseInt(hasCode.counter)
        const max_counter = parseInt(hasCode.max_counter)
        if (counter > max_counter) {
          await RedisRepository.registerFailedLoginAttempt(ip)
          return response.send('COUNTER_EXCEEED')
        }
      }
      return response.send(!!hasCode)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.send('false')
    }
  }

  async storeSeatsAvailableEmail({ params, response }) {
    const email = await EncryptionRepository.encryptField(params.email)
    const existingEmail = await SeatsAvailableEmail.query().where('email', email).first()
    if (existingEmail) return response.send(false)
    const seatsAvailableEmail = new SeatsAvailableEmail()
    seatsAvailableEmail.email = email
    await seatsAvailableEmail.save()
    return response.send(true)
  }

  async delete_expired_codes() {
    await ExtraSeatsCodes.query().where('expiry', '<', Database.fn.now()).delete()
  }
}

module.exports = SeatsAvailableController
