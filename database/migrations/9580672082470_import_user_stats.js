'use strict'

//Data available here: https://docs.google.com/spreadsheets/d/1hVRz3i-S4ytLRrmglI0JIkKT0mzJva0DhFCsdZ8gpl8/edit#gid=0
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_user_stats_Schema extends Schema {
  up () {
    this
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_friends', '15', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_communities', '5', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_great_communities', '10', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_followers', '12', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_games_hosted', '15', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_games_played', '10', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_great_games_hosted', '20', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_great_games_played', '15', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_likes', '1', '1981-03-19', '1981-03-19')")
    .raw(" insert into user_stats (criteria, xp_per_tick, created_at, updated_at) values ('total_number_of_commendations', '30', '1981-03-19', '1981-03-19')")

    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (1, 68,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (2, 135,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (3, 270,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (4, 405,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (5, 608,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (6, 911,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (7, 1094,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (8, 1312,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (9, 1575,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (10, 1890,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (11, 2267,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (12, 2721,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (13, 3265,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (14, 3918,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (15, 4702,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (16, 5642,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (17, 6771,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (18, 8125,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (19, 16250,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (20, 32499,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (21, 64998,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (22, 97498,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (23, 146246,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (24, 219370,  '1981-03-19', '1981-03-19')")
    .raw(" insert into user_levels (level, max_points, created_at, updated_at) values (25, 438739,  '1981-03-19', '1981-03-19')")
  }

  down () {

  }
}

module.exports = Import_user_stats_Schema
