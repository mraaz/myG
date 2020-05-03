'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupConnectionsSchema extends Schema {
  up () {
    this.create('group_connections', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('group_id').unsigned().notNullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.unique(['user_id', 'group_id']);
      table.integer('group_size').unsigned().nullable().defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('group_connections')
  }
}

module.exports = GroupConnectionsSchema
