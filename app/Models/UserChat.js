'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserChat extends Model {
  static formatDates(field, value) {
    const isoDate = new Date(value).toISOString();
    return isoDate.replace("T", " ").split('.')[0];
  }
}

module.exports = UserChat
