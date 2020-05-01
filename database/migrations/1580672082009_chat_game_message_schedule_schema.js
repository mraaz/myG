'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatGameMessageScheduleSchema extends Schema {
  up () {
    this.create('chat_game_message_schedules', (table) => {
      table.increments()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.datetime('schedule').nullable().index()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('chat_game_message_schedules')
  }
}

module.exports = ChatGameMessageScheduleSchema
