'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupHashTagTransactionsSchema extends Schema {
  up () {
    this.create('group_hash_tag_transactions', (table) => {
      table.increments()
      table.integer('group_id').unsigned().notNullable()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('group_hash_tag_id').unsigned().notNullable()
      table.foreign('group_hash_tag_id').references('group_hash_tags.id').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('group_hash_tag_transactions')
  }
}

module.exports = GroupHashTagTransactionsSchema
