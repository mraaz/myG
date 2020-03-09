'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatLastClearedSchema extends Schema {
  up () {
    this.create('chat_last_cleareds', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('chat_id').unsigned().notNullable()
      table.integer('last_cleared_message_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('last_cleared_message_id').references('id').inTable('chat_messages').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_last_cleareds')
  }
}

module.exports = ChatLastClearedSchema
