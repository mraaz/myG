'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuestSchema extends Schema {
  up () {
    this.create('guests', (table) => {
      table.increments()
      table.string('public_key', 172).nullable()
      table.string('uuid', 36).nullable()
      table.integer('chat_id').unsigned().notNullable().index()
      table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE')
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('guests')
  }
}

module.exports = GuestSchema
