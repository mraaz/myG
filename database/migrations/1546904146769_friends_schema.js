'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FriendsSchema extends Schema {
  up () {
    this.create('friends', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('friend_id').unsigned().notNullable()
      table.foreign('friend_id').references('users.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('friends')
  }
}

module.exports = FriendsSchema
