'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupsSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('name', 254).notNullable().unique()
      table.integer('type').unsigned().notNullable().defaultTo(1)
      table.string('group_img', 254).nullable()
      table.integer('all_accept').unsigned().notNullable().defaultTo(1)
      table.integer('game_names_id').unsigned().nullable()
      table.foreign('game_names_id').references('game_names.id')
      table.string('grp_description', 254).nullable()
      table.integer('verified').unsigned().notNullable().defaultTo(0)
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupsSchema
