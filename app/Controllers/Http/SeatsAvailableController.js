'use strict'

const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const SeatsAvailableEmail = use('App/Models/SeatsAvailableEmail')

class SeatsAvailableController {
  async fetchSeatsAvailable({ response }) {
    const seatsAvailable = ((await SeatsAvailable.query().first()) || { toJSON: () => ({}) }).toJSON().seats_available || 0
    return response.send(seatsAvailable)
  }

  async checkExtraSeatsCode({ params, response }) {
    const code = params.code
    const hasCode = await ExtraSeatsCodes.query().where('code', code).andWhere('user_id', null).first()
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
