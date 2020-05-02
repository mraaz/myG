'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.integer('game_id').unsigned().index()
      table.integer('individual_game_id').unsigned().index()
      table.text('icon')
      table.string('title', 64).index()
      table.text('last_message')
      table.text('public_key')
      table.text('contacts').notNullable().defaultTo('[]')
      table.text('guests').notNullable().defaultTo('[]')
      table.text('owners').notNullable().defaultTo('[]')
      table.text('moderators').notNullable().defaultTo('[]')
      table.boolean('self_destruct').notNullable().defaultTo(false)
      table.boolean('isPrivate').notNullable().defaultTo(false)
      table.boolean('isGroup').notNullable().defaultTo(false).index()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
