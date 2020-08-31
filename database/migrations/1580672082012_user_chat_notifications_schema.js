'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserChatNotificationSchema extends Schema {
  up () {
    this.create('user_chat_notifications', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.integer('user_id').unsigned().notNullable().index()
      table.integer('sender_id').unsigned().notNullable()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('sender_alias').notNullable()
      table.text('type').notNullable()
      table.text('content').notNullable()
      table.text('sender_icon')
      table.text('group_title')
      table.text('group_icon')
      table.integer('count')
      table.boolean('has_read')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_chat_notifications')
  }
}

module.exports = UserChatNotificationSchema
