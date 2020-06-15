'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_messages', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.integer('sender_id').unsigned().notNullable()
      table.integer('key_receiver').unsigned().index()
      table.text('sender_name').notNullable()
      table.text('content').notNullable()
      table.text('backup').notNullable()
      table.text('unencrypted_content')
      table.text('attachment')
      table.integer('reply_id').unsigned()
      table.text('reply_content')
      table.text('reply_backup')
      table.boolean('deleted').notNullable().defaultTo(false)
      table.boolean('edited').notNullable().defaultTo(false)
      table.boolean('self_destruct').notNullable().defaultTo(false)
      table.boolean('is_attachment').notNullable().defaultTo(false).index()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_messages')
  }
}

module.exports = ChatMessageSchema
