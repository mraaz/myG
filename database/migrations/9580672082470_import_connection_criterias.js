'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_game_names_Schema extends Schema {
  up () {
    this
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('check_if_same_games_in_profile', 10, '1981-03-19', '1981-03-19')")
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('check_if_in_same_communities', 5, '1981-03-19', '1981-03-19')")
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('check_if_in_same_location', 40, '1981-03-19', '1981-03-19')")
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('myCommon_friends', 5, '1981-03-19', '1981-03-19')")
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('have_we_played_together', 15, '1981-03-19', '1981-03-19')")
    .raw(" insert into connection_criterias (criteria, score, created_at, updated_at) values ('have_I_viewed_this_profile', 5, '1981-03-19', '1981-03-19')")
  }

  down () {

  }
}

module.exports = Import_game_names_Schema
