'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_game_names_fields_data_Schema extends Schema {
  up () {
    this
    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (998, '{\"value_one\": \"dota2_medal_ranks\", \"value_two\": \"dota2_server_regions\", \"value_three\": \"dota2_roles\"}', '{\"dota2_medal_ranks\": \"Please advise what is your current Medal Rank?\", \"dota2_server_regions\": \"Select what region/s you can play\", \"dota2_roles\": \"Select the role/s you wish to apply for\"}','{\"dota2_medal_ranks\": \"Single\", \"dota2_server_regions\": \"Multi\", \"dota2_roles\": \"Multi\"}', '{\"dota2_medal_ranks\": \"Medal Ranks\", \"dota2_server_regions\": \"Server Regions\", \"dota2_roles\": \"Roles\"}', '{\"dota2_medal_ranks\": \"Herald, Guardian, Crusader, Archon, Legend, Ancient, Divine, Immortal\", \"dota2_server_regions\": \"EU West, EU East, EU North, Poland, Spain, US Northwest, US Northeast, US Northcentral, US Southwest, Australia, Brazil, Chile, Emirates, India, India East, Peru, Japan, Hong Kong, Singapore, South Africa, China Shanghai, China Guangzhou, China Tianjin, China TC Zhejiang, China UC, China UC 2, China TC Wuhan\" , \"dota2_roles\": \"Position 1, Position 2, Position 3, Position 4, Position 5\"}', '1988-08-08', '1988-08-08')")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1015, '{\"value_one\": \"clash_royale_trophies\"}','{\"clash_royale_trophies\": \"Please select your trophy range\"}','{\"clash_royale_trophies\": \"Single\"}','{\"clash_royale_trophies\": \"Trophies\"}', '{\"clash_royale_trophies\": \"1000, 2000, 3000, 4000, 5000, competitive\"}', '1988-08-08', '1988-08-08');")
  }

  down () {

  }
}

module.exports = Import_game_names_fields_data_Schema
