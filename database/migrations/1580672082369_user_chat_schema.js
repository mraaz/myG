'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserChatSchema extends Schema {
  up () {
    this.create('user_chats', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('chat_id').references('uuid').inTable('chats').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_chats')
  }
}

module.exports = UserChatSchema
