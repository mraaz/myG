'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowersSchema extends Schema {
  up () {
    this.create('followers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('follower_id').unsigned()
      table.foreign('follower_id').references('users.id').onDelete('cascade')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.unique(['user_id', 'follower_id']);
      table.unique(['user_id', 'group_id']);
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('followers')
  }
}

module.exports = FollowersSchema
