'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MyG_data_Schema extends Schema {
  up () {
    this
    .raw(" insert into users (alias, email, created_at, updated_at) values ('Raaz', 'mnraaz@gmail.com', '1988-08-08', '1988-08-08')")
    .raw(" insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('1943: The Battle of Midway', 1, 1, '1988-08-08', '1988-08-08')")
  }
}

module.exports = MyG_data_Schema
