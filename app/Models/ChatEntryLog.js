'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatEntryLog extends Model {
  chat() {
    return this.belongsTo('App/Models/Chat')
  }
}

module.exports = ChatEntryLog
