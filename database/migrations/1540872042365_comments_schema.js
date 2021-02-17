'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.text('content').notNullable().collate('utf8mb4_unicode_ci')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.string('media_url', 2048).nullable()
      table.timestamps(true,true)
    })
  }




  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
