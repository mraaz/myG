'use strict'

const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const { log } = require('../../Common/logger')

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
}

module.exports = SeatsAvailableController
