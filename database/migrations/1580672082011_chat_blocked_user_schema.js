'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatBlockedUserSchema extends Schema {
  up () {
    this.create('chat_blocked_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('blocked_user_id').unsigned().notNullable().index()
      table.foreign('blocked_user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_blocked_users')
  }
}

module.exports = ChatBlockedUserSchema
