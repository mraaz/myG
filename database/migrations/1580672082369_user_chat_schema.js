'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserChatSchema extends Schema {
  up () {
    this.create('user_chats', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_chats')
  }
}

module.exports = UserChatSchema
