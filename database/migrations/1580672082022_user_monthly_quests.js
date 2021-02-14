'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMonthlyQuestsSchema extends Schema {
  up () {
    this.create('user_monthly_quests', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index()
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.text('type').notNullable()
      table.integer('completed').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_monthly_quests')
  }
}

module.exports = UserMonthlyQuestsSchema
