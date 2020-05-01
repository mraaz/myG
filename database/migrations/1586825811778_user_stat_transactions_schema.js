'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use("Database")

class UserStatTransactionsSchema extends Schema {
  up () {
    this.create('user_stat_transactions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('user_stat_id').unsigned().notNullable()
      table.foreign('user_stat_id').references('user_stats.id').onDelete('cascade')
      table.string('values', 1024)
      table.string('last_month_values', 1024)
      table.datetime('last_month_updated_at').defaultTo(Database.raw("CURRENT_TIMESTAMP"))
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_stat_transactions')
  }
}

module.exports = UserStatTransactionsSchema
