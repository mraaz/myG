'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatLastReadSchema extends Schema {
  up () {
    this.create('chat_last_reads', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.integer('chat_id').unsigned().notNullable().index()
      table.integer('last_read_message_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('last_read_message_id').references('id').inTable('chat_messages').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_last_reads')
  }
}

module.exports = ChatLastReadSchema
