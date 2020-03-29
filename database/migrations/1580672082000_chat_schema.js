'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.integer('game_id').unsigned().index()
      table.text('icon')
      table.text('title')
      table.text('last_message')
      table.text('public_key')
      table.text('contacts').notNullable().defaultTo('[]')
      table.text('guests').notNullable().defaultTo('[]')
      table.text('owners').notNullable().defaultTo('[]')
      table.text('moderators').notNullable().defaultTo('[]')
      table.boolean('isPrivate').notNullable().defaultTo(false)
      table.boolean('isGroup').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
