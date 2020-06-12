'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_game_name_fields_data_Schema extends Schema {
  up () {
    this
    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_labels, in_game_field_types, created_at, updated_at) values (998, '{\"value_one\": \"dota2_medal_ranks\", \"value_two\": \"dota2_server_regions\", \"value_three\": \"dota2_roles\"}', '{\"dota2_medal_ranks\": \"Select your current Medal Rank?\", \"dota2_server_regions\": \"Select what region/s you can play\", \"dota2_roles\": \"Select the role/s you wish to apply for\"}','{\"dota2_medal_ranks\": \"Single\", \"dota2_server_regions\": \"Multi\", \"dota2_roles\": \"Multi\"}', '1988-08-08', '1988-08-08')")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_labels, in_game_field_types, created_at, updated_at) values (1015, '{\"value_one\": \"clash_royale_trophies\"}','{\"clash_royale_trophies\": \"Select your trophy range\"}','{\"clash_royale_trophies\": \"Single\"}', '1988-08-08', '1988-08-08');")
  }

  down () {

  }
}

module.exports = Import_game_name_fields_data_Schema
