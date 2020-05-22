'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsergroupsSchema extends Schema {
  up () {
    this.create('usergroups', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('group_id').unsigned().notNullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('permission_level').unsigned().notNullable().defaultTo(1)
      table.unique(['user_id', 'group_id']);  
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('usergroups')
  }
}

module.exports = UsergroupsSchema
