'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_data_Schema extends Schema {
  up () {
    this
    .raw("insert into groups (name, user_id, group_img, game_names_id, grp_description, created_at, updated_at) values ('StarCraft II', 1, 'grp_img', 998, 'grp_description',  '1988-08-08', '1988-08-08')")



  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
