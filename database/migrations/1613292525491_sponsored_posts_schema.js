'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SponsoredPostsSchema extends Schema {
  up () {
    this.create('sponsored_posts', (table) => {
      table.increments()
      table.text('content').collate('utf8mb4_unicode_ci')
      table.string('type').notNullable()
      table.string('media_url', 4888).nullable()
      table.string('click_url', 4888).nullable()
      table.string('url', 4888).nullable()
      table.text('caption').collate('utf8mb4_unicode_ci')
      table.integer('visibility').defaultTo(1)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('sponsored_posts')
  }
}

module.exports = SponsoredPostsSchema
