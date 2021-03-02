'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserQuestsSelectionSchema extends Schema {
  up () {
    this.create('user_quests_selection', (table) => {
      table.increments()
      table.text('type').notNullable()
      table.text('quests').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('user_quests_selection')
  }
}

module.exports = UserQuestsSelectionSchema
