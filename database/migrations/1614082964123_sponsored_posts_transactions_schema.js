'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SponsoredPostsTransactionsSchema extends Schema {
  up () {
    this.create('sponsored_posts_transactions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('sponsored_posts_id').unsigned().notNullable()
      table.foreign('sponsored_posts_id').references('sponsored_posts.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('sponsored_posts_transactions')
  }
}

module.exports = SponsoredPostsTransactionsSchema
