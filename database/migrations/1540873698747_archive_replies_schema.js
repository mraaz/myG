'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepliesSchema extends Schema {
  up () {
    this.create('archive_replies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('archive_comment_id').unsigned().nullable()
      table.foreign('archive_comment_id').references('archive_comments.archive_comment_id').onDelete('cascade')
      table.text('content').notNullable()
      table.timestamp('og_created_at').notNullable()
      table.timestamp('og_updated_at').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('archive_replies')
  }
}

module.exports = RepliesSchema
