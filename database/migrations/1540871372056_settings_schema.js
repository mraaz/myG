'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use("Database")

class SettingsSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.boolean('email_notification').defaultTo(1).index()
      table.boolean('push_notification').defaultTo(0)
      table.datetime('gamer_connection_last_runtime').defaultTo(Database.raw("CURRENT_TIMESTAMP"))
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingsSchema
