'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_messages', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable()
      table.integer('sender_id').unsigned().notNullable()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('key_receiver').unsigned();
      table.text('content').notNullable()
      table.text('backup').notNullable()
      table.boolean('deleted').notNullable().defaultTo(false)
      table.boolean('edited').notNullable().defaultTo(false)
      table.boolean('self_destruct').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_messages')
  }
}

module.exports = ChatMessageSchema
