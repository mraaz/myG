'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatEntryLog extends Model {
  chat() {
    return this.belongsTo('App/Models/Chat')
  }
  static formatDates(field, value) {
    const isoDate = new Date(value).toISOString();
    return isoDate.replace("T", " ").split('.')[0];
  }
}

module.exports = ChatEntryLog
