'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HashTagsSchema extends Schema {
  up () {
    this.create('hash_tags', (table) => {
      table.increments()
      table.string('content', 250).notNullable().unique().index()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('verified').unsigned().notNullable().defaultTo(0)
      table.integer('counter').unsigned().nullable().defaultTo(1)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('hash_tags')
  }
}

module.exports = HashTagsSchema
