'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('activity_type').unsigned().notNullable()
      table.integer('other_user_id').unsigned().notNullable()
      table.foreign('other_user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned().nullable()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('comment_id').unsigned().nullable()
      table.foreign('comment_id').references('comments.id').onDelete('cascade')
      table.integer('reply_id').unsigned().nullable()
      table.foreign('reply_id').references('replies.id').onDelete('cascade')
      table.integer('schedule_games_id').unsigned().nullable()
      table.foreign('schedule_games_id').references('schedule_games.id').onDelete('cascade')
      table.integer('archive_schedule_game_id').unsigned().nullable()
      table.foreign('archive_schedule_game_id').references('archive_schedule_games.archive_schedule_game_id').onDelete('cascade')
      table.integer('group_id').unsigned().nullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('read_status').unsigned().nullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
