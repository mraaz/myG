'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class update_clash_royale_fields_Schema extends Schema {
  up () {
    this
    .raw("update game_name_fields set in_game_fields = '{\"value_one\":\"clash_royale_trophies\",\"value_six\":\"stats_link\", \"value_seven\": \"stats_header\"}' where game_names_id = 1014;")
    
    .raw("update game_name_fields set in_game_field_placeholders = '{\"clash_royale_trophies\":\"Please select your trophy range\", \"stats_header\": \"Enter Clan tag, e.g. YL9YCYU\"}' where game_names_id = 1014;")

    .raw("update game_name_fields set in_game_field_types = '{\"clash_royale_trophies\":\"Single\",\"stats_link\":\"Input\",\"stats_header\":\"Input\"}' where game_names_id = 1014;")

    .raw("update game_name_fields set in_game_field_labels = '{\"clash_royale_trophies\":\"Trophies\",\"stats_link\":\"Profile Link\",\"stats_header\":\"Clan tag\"}' where game_names_id = 1014;")
  }

  down () {

  }
}

module.exports = update_clash_royale_fields_Schema
