'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_message_reactions', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.integer('message_id').unsigned().notNullable().index()
      table.foreign('message_id').references('id').inTable('chat_messages').onDelete('CASCADE')
      table.integer('reaction_id').unsigned().notNullable()
      table.integer('sender_id').unsigned().notNullable()
      table.text('sender_name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_message_reactions')
  }
}

module.exports = ChatMessageSchema
