'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('alias', 19).notNullable().unique().defaultTo("").index()
      table.string('first_name', 50).nullable().defaultTo("")
      table.string('last_name', 50).nullable().defaultTo("")
      table.string('email', 88).notNullable().unique()
      table.string('password', 60).nullable()
      table.string('country', 254).nullable().defaultTo("")
      table.string('regional', 254).nullable().defaultTo("")
      table.string('profile_img', 254).nullable()
      table.string('profile_bg', 254).nullable()
      table.string('team', 254).nullable().defaultTo("")
      table.string('slogan', 254).nullable().defaultTo("")
      table.string('bio', 254).nullable().defaultTo("")
      table.string('contact_info', 254).nullable().defaultTo("")
      table.string('relationship_status', 254).nullable().defaultTo("")
      table.string('provider_id', 254).nullable()
      table.string('provider', 254).nullable()
      table.enu('status', ['online', 'playing', 'afk', 'offline']).notNullable().defaultTo('offline').index()
      table.enu('last_status', ['online', 'playing', 'afk', 'offline']).notNullable().defaultTo('online')
      table.enu('name_visibility', ['secret', 'friends', 'public']).notNullable().defaultTo('secret')
      table.enu('email_visibility', ['secret', 'friends', 'public']).notNullable().defaultTo('secret')
      table.boolean('looking_for_work').notNullable().defaultTo(false)
      table.boolean('status_locked').notNullable().defaultTo(false)
      table.datetime('last_seen').nullable()
      table.string('public_key', 172).nullable()
      table.boolean('notification_sounds_disabled').notNullable().defaultTo(false)
      table.boolean('chat_auto_self_destruct').notNullable().defaultTo(false)
      table.integer('level').unsigned().defaultTo(1)
      table.integer('experience_points').notNullable().defaultTo(0)
      table.integer('stashed_experience_points').nullable().defaultTo(0)
      table.boolean('xp_negative_balance').notNullable().defaultTo(false)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
