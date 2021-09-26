'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use("Database")

class ClashRoyaleSchema extends Schema {
  up () {
    this.create('clash_royale_reminder', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')      
      table.string('clan_tag', 254).notNullable().index()
      table.string('player_tag', 254).notNullable()
      table
        .datetime("email_notification_last_runtime")
        .defaultTo(Database.raw("CURRENT_TIMESTAMP")).index()
      table.integer('number_of_wars_remaining').unsigned().defaultTo(0).index()
      table.time("reminder_time").notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('clash_royale_reminder')
  }
}

module.exports = ClashRoyaleSchema
