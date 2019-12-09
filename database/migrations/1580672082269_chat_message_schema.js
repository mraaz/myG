'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_messages', (table) => {
      table.increments()
      table.uuid('chat_id').references('uuid').inTable('chats').onDelete('CASCADE')
      table.string('user_id').notNullable()
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_messages')
  }
}

module.exports = ChatMessageSchema
