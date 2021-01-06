'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_data_Schema extends Schema {
  up () {
    this
    .raw("INSERT INTO seats_available (seats_available) values (25)")

    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('StarCraft II', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Escape From Tarkov', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Hades', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Super Mario Maker 2', 1, 1, '1988-08-08', '1988-08-08')")



    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-390x520.jpg\" where game_name = \"StarCraft\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-390x520.jpg\" where game_name = \"StarCraft II\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-390x520.jpg\" where game_name = \"Escape From Tarkov\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-390x520.jpg\" where game_name = \"Rust\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-390x520.jpg\" where game_name = \"Call of Duty: Modern Warfare 2\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-390x520.jpg\" where game_name = \"Hades\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-390x520.jpg\" where game_name = \"Super Mario Maker 2\"")

  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
