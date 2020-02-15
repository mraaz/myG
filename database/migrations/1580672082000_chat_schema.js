'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.text('icon')
      table.text('title')
      table.text('last_message')
      table.text('public_key')
      table.text('contacts').notNullable().defaultTo('[]')
      table.text('owners').notNullable().defaultTo('[]')
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
