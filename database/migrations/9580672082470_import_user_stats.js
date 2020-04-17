'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_user_stats_Schema extends Schema {
  up () {
    this
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_friends', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_communities', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_great_communities', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_followers', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_games_hosted', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_games_played', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_great_games_hosted', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_great_games_played', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_likes', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, created_at, updated_at) values ('total_number_of_commendations', '1981-03-19', '1981-03-19')")

    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (1, '100',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (2, '1000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (3, '10000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (4, '100000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (5, '1000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (6, '10000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (7, '100000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (8, '1000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (9, '10000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (10, '10000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (11, '100000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (12, '1000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (13, '10000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (14, '100000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (15, '1000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (16, '10000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (17, '100000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (18, '1000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (19, '10000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (20, '100000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (21, '1000000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (22, '10000000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (23, '100000000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (24, '1000000000000000000000000',  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (25, '10000000000000000000000000',  '1981-03-19', '1981-03-19')")

  }

  down () {

  }
}

module.exports = Import_user_stats_Schema
