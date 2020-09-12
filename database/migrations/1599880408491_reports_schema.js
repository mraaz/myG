'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportsSchema extends Schema {
  up () {
    this.create('reports', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.unique(['user_id', 'post_id']);
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('reports')
  }
}

module.exports = ReportsSchema
