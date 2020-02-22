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
      table.boolean('muted').notNullable().defaultTo(false)
      table.boolean('blocked').notNullable().defaultTo(false)
      table.boolean('self_destruct').notNullable().defaultTo(false)
      table.text('deleted_messages').notNullable().defaultTo('[]')
      table.text('blocked_users').notNullable().defaultTo('[]')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_chats')
  }
}

module.exports = UserChatSchema
