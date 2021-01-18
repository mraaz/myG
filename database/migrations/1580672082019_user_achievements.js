'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAchievementsSchema extends Schema {
  up () {
    this.create('user_achievements', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('type').notNullable()
      table.integer('value').notNullable()
      table.integer('experience').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_achievements')
  }
}

module.exports = UserAchievementsSchema
