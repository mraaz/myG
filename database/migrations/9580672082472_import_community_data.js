'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_data_Schema extends Schema {
  up () {
    this
    .raw("insert into groups (name, user_id, group_img, game_names_id, grp_description, created_at, updated_at) values ('Dota 2 - myG Official', 1, 'https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-600x320.jpg', 998, 'Offical community, hosted by myG',  '1988-08-08', '1988-08-08')")



  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
