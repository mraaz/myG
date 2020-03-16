'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatLastReadSchema extends Schema {
  up () {
    this.create('chat_links', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.string('uuid', 36).notNullable()
      table.integer('expiry').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_links')
  }
}

module.exports = ChatLastReadSchema
