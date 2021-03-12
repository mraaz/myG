'use strict'

const { getIp } = require('../../Common/ip')
const RedisRepository = require('../../Repositories/Redis')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const SeatsAvailableEmail = use('App/Models/SeatsAvailableEmail')

const LoggingRepository = require('../../Repositories/Logging')

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
      console.log(code, '<<<CODE')
      const hasCode = await ExtraSeatsCodes.query()
        .where('code', code)
        .select('*')
        .first()
      console.log(hasCode, '<<<hasCode')
      if (hasCode == undefined) {
        console.log('Failed')
        await RedisRepository.registerFailedLoginAttempt(ip)
        return response.send('false')
      } else {
        console.log('Inside')
        const counter = parseInt(hasCode.counter)
        const max_counter = parseInt(hasCode.max_counter)
        if (counter > max_counter) {
          await RedisRepository.registerFailedLoginAttempt(ip)
          return response.send('COUNTER_EXCEEED')
        }
      }
      console.log('Got here Code')
      return response.send(!!hasCode)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
      return response.send('false')
    }
  }

  async storeSeatsAvailableEmail({ params, response }) {
    const email = params.email
    const existingEmail = await SeatsAvailableEmail.query()
      .where('email', email)
      .first()
    if (existingEmail) return response.send(false)
    const seatsAvailableEmail = new SeatsAvailableEmail()
    seatsAvailableEmail.email = email
    await seatsAvailableEmail.save()
    return response.send(true)
  }

  async delete_expired_codes() {
    const lock = await RedisRepository.lock('Delete expired Codes', 1000 * 60 * 5)
    if (!lock) return

    await ExtraSeatsCodes.query()
      .where('expiry', '<', Database.fn.now())
      .delete()

    return
  }
}

module.exports = SeatsAvailableController
