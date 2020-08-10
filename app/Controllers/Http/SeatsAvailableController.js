'use strict'

const { getIp } = require('../../Common/ip')
const RedisRepository = require('../../Repositories/Redis')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const SeatsAvailableEmail = use('App/Models/SeatsAvailableEmail')

class SeatsAvailableController {
  async fetchSeatsAvailable({ response }) {
    const seatsAvailable = ((await SeatsAvailable.query().first()) || { toJSON: () => ({}) }).toJSON().seats_available || 0
    return response.send(seatsAvailable)
  }

  async checkExtraSeatsCode({ req, params, response }) {
    const ip = getIp(req)
    const failedAttempts = await RedisRepository.getRecentFailedLoginAttempts(ip);
    if (failedAttempts > 5) return response.send("LIMIT_EXCEEED");
    const code = params.code
    const hasCode = await ExtraSeatsCodes.query().where('code', code).andWhere('user_id', null).first()
    if (!hasCode) await RedisRepository.registerFailedLoginAttempt(ip);
    return response.send(!!hasCode)
  }

  async storeSeatsAvailableEmail({ params, response }) {
    const email = params.email
    const existingEmail = await SeatsAvailableEmail.query().where('email', email).first()
    if (existingEmail) return response.send(false)
    const seatsAvailableEmail = new SeatsAvailableEmail()
    seatsAvailableEmail.email = email
    await seatsAvailableEmail.save()
    return response.send(true)
  }
}

module.exports = SeatsAvailableController
