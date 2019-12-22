'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('alias', 19).notNullable().unique().defaultTo("")
      table.string('first_name', 50).nullable().defaultTo("").index()
      table.string('last_name', 50).nullable().defaultTo("").index()
      table.string('email', 88).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('country', 254).nullable().defaultTo("")
      table.string('region', 254).nullable().defaultTo("")
      table.string('profile_img', 254).nullable()
      table.string('profile_bg', 254).nullable()
      table.string('slogan', 254).nullable().defaultTo("")
      table.string('bio', 254).nullable().defaultTo("")
      table.string('contact_info', 254).nullable().defaultTo("")
      table.string('relationship_status', 254).nullable().defaultTo("")
      table.string('provider_id', 254).nullable()
      table.string('provider', 254).nullable()
      table.boolean('online').notNullable().defaultTo(false)
      table.datetime('last_seen').nullable()
      table.string('public_key', 172).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
