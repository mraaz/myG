'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserLevelsSchema extends Schema {
  up () {
    this.create('user_levels', (table) => {
      table.increments()
      table.integer('level').notNullable().defaultTo(0)
      table.string('max_points', 50).defaultTo('0')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_levels')
  }
}

module.exports = UserLevelsSchema
