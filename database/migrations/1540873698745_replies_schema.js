'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepliesSchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('comment_id').unsigned().nullable()
      table.foreign('comment_id').references('comments.id').onDelete('cascade')
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('replies')
  }
}

module.exports = RepliesSchema
