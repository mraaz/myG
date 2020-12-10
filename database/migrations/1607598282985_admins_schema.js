'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminsSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('permission_level').unsigned().notNullable().defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminsSchema
