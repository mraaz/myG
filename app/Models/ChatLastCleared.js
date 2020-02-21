'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatLastCleared extends Model {
  chat() {
    return this.belongsTo('App/Models/Chat')
  }
}

module.exports = ChatLastCleared
