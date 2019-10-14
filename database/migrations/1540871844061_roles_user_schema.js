'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesUserSchema extends Schema {
  up () {
    this.create('roles_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('roles_users')
  }
}

module.exports = RolesUserSchema
