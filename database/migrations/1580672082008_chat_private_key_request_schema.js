'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatPrivateKeyRequestSchema extends Schema {
  up () {
    this.create('chat_private_key_requests', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.string('public_key', 172).nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_private_key_requests')
  }
}

module.exports = ChatPrivateKeyRequestSchema
