'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExperiencePointsSchema extends Schema {
  up () {
    this.create('experience_points', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('user_stat_id').unsigned().notNullable()
      table.foreign('user_stat_id').references('user_stats.id').onDelete('cascade')
      table.integer('highest_value').defaultTo(0)
      table.integer('current_value').defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('experience_points')
  }
}

module.exports = ExperiencePointsSchema
