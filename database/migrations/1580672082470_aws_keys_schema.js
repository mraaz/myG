'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AwsKeysSchema extends Schema {
  up () {
    this.create('aws_keys', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('posts.id').onDelete('cascade')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('groups.id').onDelete('cascade')
      table.integer('type').unsigned().notNullable()
      table.string('aws_key', 1024).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('aws_keys')
  }
}

module.exports = AwsKeysSchema
