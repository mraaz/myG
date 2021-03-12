'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BullJobs extends Schema {
  up () {
    this.create('bull_jobs', (table) => {
      table.increments()
      table.text('job').notNullable()
      table.datetime('last_execution').notNullable()
      table.timestamps(true,true)
    })
  }

  down () {
    this.drop('bull_jobs')
  }
}

module.exports = BullJobs
