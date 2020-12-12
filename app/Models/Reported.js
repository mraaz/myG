'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reported extends Model {
  static get table() {
    return 'reported'
  }
}

module.exports = Reported
