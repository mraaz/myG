'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.text('content')
      table.string('type').notNullable()
      table.string('media_url', 600).nullable()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('group_id').unsigned().nullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned().nullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.timestamps()

    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
