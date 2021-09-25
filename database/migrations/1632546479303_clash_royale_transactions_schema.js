'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClashRoyaleTransactionsSchema extends Schema {
  up () {
    this.create('clash_royale_transactions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('player_tag', 254).notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('clash_royale_transactions')
  }
}

module.exports = ClashRoyaleTransactionsSchema
