'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  messages() {
    return this.hasMany('App/Models/ChatMessage')
  }
  lastRead() {
    return this.hasMany('App/Models/ChatLastRead')
  }
  lastCleared() {
    return this.hasMany('App/Models/ChatLastCleared')
  }
  links() {
    return this.hasMany('App/Models/ChatLink')
  }
  entryLogs() {
    return this.hasMany('App/Models/ChatEntryLog')
  }
}

module.exports = Chat
