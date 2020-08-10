'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatRecentMessageSchema extends Schema {
  up () {
    this.create('chat_recent_messages', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.integer('message_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('message_id').references('id').inTable('chat_messages').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_recent_messages')
  }
}

module.exports = ChatRecentMessageSchema
