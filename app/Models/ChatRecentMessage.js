'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatRecentMessage extends Model {
  chatMessage() {
    return this.belongsTo('App/Models/ChatMessage')
  }
}

module.exports = ChatRecentMessage
