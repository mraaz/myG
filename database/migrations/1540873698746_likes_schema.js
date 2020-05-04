'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikesSchema extends Schema {
  up () {
    this.create('likes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned().nullable()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('comment_id').unsigned().nullable()
      table.foreign('comment_id').references('comments.id').onDelete('cascade')
      table.integer('reply_id').unsigned().nullable()
      table.foreign('reply_id').references('replies.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('likes')
  }
}

module.exports = LikesSchema
