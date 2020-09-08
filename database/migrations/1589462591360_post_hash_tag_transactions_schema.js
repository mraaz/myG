'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostHashTagTransactionsSchema extends Schema {
  up () {
    this.create('post_hash_tag_transactions', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('hash_tag_id').unsigned().notNullable()
      table.foreign('hash_tag_id').references('hash_tags.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('post_hash_tag_transactions')
  }
}

module.exports = PostHashTagTransactionsSchema
