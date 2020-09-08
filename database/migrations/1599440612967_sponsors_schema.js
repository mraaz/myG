'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SponsorsSchema extends Schema {
  up () {
    this.create('sponsors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('group_id').unsigned().nullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('type').unsigned().notNullable().defaultTo(1)
      table.string('link', 400).nullable()
      table.string('media_url', 6000).nullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('sponsors')
  }
}

module.exports = SponsorsSchema
