'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('archive_comments', (table) => {
      table.increments()
      table.text('content').notNullable()
      table.integer('archive_comment_id').unsigned().notNullable().unique()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('archive_schedule_game_id').unsigned()
      table.foreign('archive_schedule_game_id').references('archive_schedule_games.archive_schedule_game_id').onDelete('cascade')
      table.timestamp('og_created_at').notNullable()
      table.timestamp('og_updated_at').notNullable()
      table.timestamps(true,true)
    })
  }




  down () {
    this.drop('archive_comments')
  }
}

module.exports = CommentsSchema
