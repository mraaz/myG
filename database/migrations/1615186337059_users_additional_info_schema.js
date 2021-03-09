'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersAdditionalInfoSchema extends Schema {
  up () {
    this.create('users_additional_infos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.boolean('in_eu').notNullable().defaultTo(false)
      table.string('last_logged_in_ip', 48).nullable()
      table.string('logged_in_country_code', 254).nullable()
      table.string('logged_in_regional', 254).nullable()
      table.timestamps(true,true)
      table.unique(['user_id']);
    })
  }

  down () {
    this.drop('users_additional_infos')
  }
}

module.exports = UsersAdditionalInfoSchema
