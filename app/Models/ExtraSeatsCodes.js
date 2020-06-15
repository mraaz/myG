'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ExtraSeatsCodes extends Model {
  static get table () {
    return 'extra_seats_codes'
  }
}

module.exports = ExtraSeatsCodes
