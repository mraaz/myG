'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatLastReadSchema extends Schema {
  up () {
    this.create('chat_entry_logs', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.text('alias').notNullable()
      table.boolean('kicked').notNullable().defaultTo(false)
      table.boolean('left').notNullable().defaultTo(false)
      table.boolean('invited').notNullable().defaultTo(false)
      table.boolean('link').notNullable().defaultTo(false)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_entry_logs')
  }
}

module.exports = ChatLastReadSchema
