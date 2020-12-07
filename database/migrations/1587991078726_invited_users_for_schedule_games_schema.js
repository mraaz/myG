'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitedUsersForScheduleGamesSchema extends Schema {
  up () {
    this.create('invited_users_for_schedule_games', (table) => {
      table.increments()
      table.integer('schedule_games_id').unsigned().notNullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('chat_id').unsigned()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('invited_users_for_schedule_games')
  }
}

module.exports = InvitedUsersForScheduleGamesSchema
