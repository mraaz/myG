'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoHostsSchema extends Schema {
  up () {
    this.create('co_hosts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned().notNullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('co_hosts')
  }
}

module.exports = CoHostsSchema
