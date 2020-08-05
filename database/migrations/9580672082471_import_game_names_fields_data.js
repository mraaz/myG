'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_game_names_fields_data_Schema extends Schema {
  up () {
    this

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (998, '{\"value_one\": \"dota2_server_regions\", \"value_two\": \"dota2_medal_ranks\", \"value_three\": \"dota2_roles\"}', '{\"dota2_server_regions\": \"Select what region/s you can play\", \"dota2_medal_ranks\": \"Please advise what Medal Rank/s you are looking for?\", \"dota2_roles\": \"Select the role/s you wish to apply for\"}','{\"dota2_server_regions\": \"Multi\", \"dota2_medal_ranks\": \"Multi\", \"dota2_roles\": \"Multi\"}', '{\"dota2_server_regions\": \"Server Regions\", \"dota2_medal_ranks\": \"Medal Ranks\", \"dota2_roles\": \"Roles\"}', '{\"dota2_medal_ranks\": \"Herald, Guardian, Crusader, Archon, Legend, Ancient, Divine, Immortal\", \"dota2_server_regions\": \"EU West, EU East, EU North, Poland, Spain, US Northwest, US Northeast, US Northcentral, US Southwest, Australia, Brazil, Chile, Emirates, India, India East, Peru, Japan, Hong Kong, Singapore, South Africa, China Shanghai, China Guangzhou, China Tianjin, China TC Zhejiang, China UC, China UC 2, China TC Wuhan\" , \"dota2_roles\": \"Position 1, Position 2, Position 3, Position 4, Position 5\"}', '1988-08-08', '1988-08-08')")

    //Corea spelling is intentional
    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (999, '{\"value_one\": \"lol_server_regions\", \"value_two\": \"lol_ranks\", \"value_three\": \"lol_roles\"}', '{\"lol_server_regions\": \"Select what region/s you can play\", \"lol_ranks\": \"Please advise what Rank/s you are looking for?\", \"lol_roles\": \"Select the role/s you wish to apply for\"}','{\"lol_server_regions\": \"Multi\", \"lol_ranks\": \"Multi\", \"lol_roles\": \"Multi\"}', '{\"lol_server_regions\": \"Server Regions\", \"lol_ranks\": \"Ranks\", \"lol_roles\": \"Roles\"}', '{\"lol_ranks\": \"Iron I, Iron II, Iron III, Iron IV, Bronze I, Bronze II, Bronze III, Bronze IV, Silver I, Silver II, Silver III, Silver IV, Gold I, Gold II, Gold III, Gold IV, Platinum I, Platinum II, Platinum III, Platinum IV, Diamond I, Diamond II, Diamond III, Diamond IV, Master, Grandmaster, Challenger\", \"lol_server_regions\": \"North America, Europe West, Europe East, Oceania, South East Asia, Latin America North, Latin America South, Brazil, Russia, Turkey, Japan, Corea\" , \"lol_roles\": \"Top, Jungle, Mid, ADC, Support\"}', '1988-08-08', '1988-08-08')")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1037, '{\"value_one\": \"mlbb_ranks\", \"value_two\": \"mlbb_classes\", \"value_three\": \"mlbb_levels\"}', '{\"mlbb_ranks\": \"Please advise what Rank/s you are looking for?\", \"mlbb_classes\": \"Select the class/es you wish to apply for\", \"mlbb_levels\": \"Please select your minimum level \"}','{\"mlbb_ranks\": \"Multi\", \"mlbb_classes\": \"Multi\", \"mlbb_levels\": \"Multi\"}', '{\"mlbb_ranks\": \"Ranks\", \"mlbb_classes\": \"Classes\", \"mlbb_levels\": \"Levels\"}', '{\"mlbb_ranks\": \"Warrior, Elite, Master, Grandmaster, Epic, Legend, Mythic, Glorious Mythic\", \"mlbb_classes\": \"Tank, Fighter, Assassin, Mage, Marksman, Support\", \"mlbb_levels\": \"<10, <20, <30, 30\"}', '1988-08-08', '1988-08-08')")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1014, '{\"value_one\": \"clash_royale_trophies\"}','{\"clash_royale_trophies\": \"Please select your trophy range\"}','{\"clash_royale_trophies\": \"Single\"}','{\"clash_royale_trophies\": \"Trophies\"}', '{\"clash_royale_trophies\": \"1000, 2000, 3000, 4000, 5000, competitive\"}', '1988-08-08', '1988-08-08');")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1020, '{\"value_one\": \"overw_server_regions\", \"value_two\": \"overw_game_modes\", \"value_three\": \"overw_ranks\", \"value_four\": \"overw_roles\", \"value_five\": \"overw_levels\"}','{\"overw_server_regions\": \"Select what region/s you can play\", \"overw_game_modes\": \"Please select your game modes\", \"overw_ranks\": \"Please select which ranks?\", \"overw_roles\": \"Please select which roles\", \"overw_levels\": \"Please select your minimum levels\"}','{\"overw_server_regions\": \"Multi\", \"overw_game_modes\": \"Multi\", \"overw_ranks\": \"Multi\", \"overw_roles\": \"Multi\",  \"overw_levels\": \"Single\"}','{\"overw_server_regions\": \"Server Regions\", \"overw_game_modes\": \"Game Modes\", \"overw_ranks\": \"Ranks\", \"overw_roles\": \"Roles\", \"overw_levels\": \"Levels\" }', '{\"overw_server_regions\": \"Americas, Europe, Asia\", \"overw_game_modes\": \"Quick Play, Competitive, Arcade\", \"overw_ranks\": \"Bronze: 0 to 1500 SR, Silver: 1500 to 1999 SR, Gold 2000 to 2499 SR, Platinum: 2500 to 2999 SR, Diamond: 3000 to 3499 SR, Masters: 3500 to 3999 SR, Grandmaster: 4000 to 5000 SR\", \"overw_roles\": \"DPS, Tank, Support, Flex\", \"overw_levels\": \"0-100, 100-200, 200-300, 300-400, 400-500, 500-600, 600-700, 700-800, 800-900, 900-1000, 1000-1100, 1100-1200, 1200+\"}', '1988-08-08', '1988-08-08');")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (100, '{\"value_one\": \"cod_warzone_server_regions\", \"value_two\": \"cod_warzone_game_modes\", \"value_three\": \"cod_warzone_kd_ratio\", \"value_four\": \"cod_warzone_wins\"}','{\"cod_warzone_server_regions\": \"Select what levels you are looking for\", \"cod_warzone_game_modes\": \"Please select your game modes\", \"cod_warzone_kd_ratio\": \"Please select KD range\", \"cod_warzone_wins\": \"Please select your minimum wins\"}','{\"cod_warzone_server_regions\": \"Multi\", \"cod_warzone_game_modes\": \"Multi\", \"cod_warzone_kd_ratio\": \"Single\", \"cod_warzone_wins\": \"Single\"}','{\"cod_warzone_server_regions\": \"Server Regions\", \"cod_warzone_game_modes\": \"Game Modes\", \"cod_warzone_kd_ratio\": \"K/D Ratio\", \"cod_warzone_wins\": \"Wins\" }', '{\"cod_warzone_server_regions\": \"America, Europe, Asia\", \"cod_warzone_game_modes\": \"Battle Royale: Duos, Battle Royale: Trios, Battle Royale: Quads, Plunder\", \"cod_warzone_kd_ratio\": \"<0.5, <1, <1.5, <2, <2.5, 3+\", \"cod_warzone_wins\": \"0-10, 10-30, 30-50, 50-100, 100+\"}', '1988-08-08', '1988-08-08');")

    //Four
    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1001, '{\"value_one\": \"apex_legends_game_modes\", \"value_two\": \"apex_legends_level\", \"value_three\": \"apex_legends_wins\", \"value_four\": \"apex_legends_kills\"}','{\"apex_legends_game_modes\": \"Please select your game modes\", \"apex_legends_level\": \"Please select your minimum level\", \"apex_legends_wins\": \"Please select your minimum wins\", \"apex_legends_kills\": \"Please select your minimum kills\"}','{\"apex_legends_game_modes\": \"Multi\", \"apex_legends_level\": \"Single\", \"apex_legends_wins\": \"Single\", \"apex_legends_kills\": \"Single\"}','{\"apex_legends_game_modes\": \"Game Modes\", \"apex_legends_level\": \"Levels\", \"apex_legends_wins\": \"Wins\", \"apex_legends_kills\": \"Kills\" }', '{\"apex_legends_game_modes\": \" Duos, Trios\", \"apex_legends_level\": \"<50, <100, <150, <200, <250, <300, <350, <400, <450, 500\", \"apex_legends_wins\": \"0-50, 50-150, 150-400, 400-800, 800+\", \"apex_legends_kills\": \"<100, <500, <1000, <5000, <10K, 10K+\"}', '1988-08-08', '1988-08-08');")

    //Five
    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1043, '{\"value_one\": \"csgo_server_regions\", \"value_two\": \"csgo_game_modes\", \"value_three\": \"csgo_server_roles\", \"value_four\": \"csgo_server_rank\", \"value_five\": \"csgo_kd_ratio\"}','{\"csgo_server_regions\": \"Select what region/s you can play\", \"csgo_server_rank\": \"Please select minimum rank\", \"csgo_server_roles\": \"Please select which roles?\", \"csgo_game_modes\": \"Please select your game modes\", \"csgo_kd_ratio\": \"Please select KD range\"}','{\"csgo_server_regions\": \"Multi\", \"csgo_server_rank\": \"Multi\", \"csgo_server_roles\": \"Multi\", \"csgo_game_modes\": \"Multi\",  \"csgo_kd_ratio\": \"Single\"}','{\"csgo_server_regions\": \"Server Regions\", \"csgo_server_rank\": \"Ranks\", \"csgo_server_roles\": \"Roles\", \"csgo_game_modes\": \"Game Modes\", \"csgo_kd_ratio\": \"K/D Ratio\" }', '{\"csgo_server_regions\": \"North America East, North America West, North America Central, South America, Europe East, Europe West, Europe Central, Europe North, Asia, Oceania, Africa, Middle East\", \"csgo_server_rank\": \"Silver I, Silver II, Silver III, Silver IV, Silver Elite, Silver Elite Master, Gold Nova I, Gold Nova II, Gold Nova III, Gold Nova Master, Master Guardian I, Master Guardian II, Master Guardian Elite, Distinguished Master Guardian, Legendary Eagle, Legendary Eagle Master, Supreme Master First Class, The Global Elite\", \"csgo_server_roles\": \"Entry Fragger, Support, In-game Leader, AWPer, Lurker, Rifler\", \"csgo_game_modes\": \"Competitive PUGs, League, Matchmaking\", \"csgo_kd_ratio\": \"<0.5, <1, <1.5, <2, <2.5, 3+\"}', '1988-08-08', '1988-08-08');")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1000, '{\"value_one\": \"fortnite_server_regions\", \"value_two\": \"fortnite_game_modes\", \"value_three\": \"fortnite_kd_ratio\", \"value_four\": \"fortnite_wins\", \"value_five\": \"fortnite_kills\"}','{\"fortnite_server_regions\": \"Select what region/s you can play\", \"fortnite_game_modes\": \"Please select your game modes\", \"fortnite_kd_ratio\": \"Please select KD range\", \"fortnite_wins\": \"Please select your minimum wins\", \"fortnite_kills\": \"Please select your minimum kills\"}','{\"fortnite_server_regions\": \"Multi\", \"fortnite_game_modes\": \"Multi\", \"fortnite_kd_ratio\": \"Single\", \"fortnite_wins\": \"Single\",  \"fortnite_kills\": \"Single\"}','{\"fortnite_server_regions\": \"Server Regions\", \"fortnite_game_modes\": \"Game Modes\", \"fortnite_kd_ratio\": \"K/D Ratio\", \"fortnite_wins\": \"Wins\", \"fortnite_kills\": \"Kills\" }', '{\"fortnite_server_regions\": \"NA East, NA West, Europe, Oceania, Brazil, Asia, Middle East\", \"fortnite_game_modes\": \"Battle Royale: Duos, Battle Royale: Squads, Save the world, Arena, Team Rumble\", \"fortnite_kd_ratio\": \"<0.5, <1, <1.5, <2, <2.5, <5, <10, <15, 20+ \", \"fortnite_wins\": \"0-10, 10-30, 30-50, 50-100, 100-150, 200+\", \"fortnite_kills\": \"0-10, 10-30, 30-50, 50-100, 100-150, 200+\"}', '1988-08-08', '1988-08-08');")

    .raw("insert into game_name_fields(game_names_id, in_game_fields,in_game_field_placeholders, in_game_field_types, in_game_field_labels, in_game_field_values, created_at, updated_at) values (1040, '{\"value_one\": \"pubg_platform\", \"value_two\": \"pubg_server_regions\", \"value_three\": \"pubg_game_modes\", \"value_four\": \"pubg_ranks\"}','{\"pubg_platform\": \"Select which platform\", \"pubg_server_regions\": \"Select what region/s you can play\", \"pubg_game_modes\": \"Please select your game modes\", \"pubg_ranks\": \"Please select minimum rank\"}','{\"pubg_platform\": \"Single\", \"pubg_server_regions\": \"Multi\", \"pubg_game_modes\": \"Multi\", \"pubg_ranks\": \"Single\"}','{\"pubg_platform\": \"Platform\", \"pubg_server_regions\": \"Server Regions\", \"pubg_game_modes\": \"Game Modes\", \"pubg_ranks\": \"Ranks\" }', '{\"pubg_platform\": \"Console, PC\", \"pubg_server_regions\": \"North America, Europe, Asia, Oceania, South America  \", \"pubg_game_modes\": \"Duos, Squads\", \"pubg_ranks\": \"Bronze, Silver, Gold, Platinum, Diamond, Elite, Master, Grandmaster\"}', '1988-08-08', '1988-08-08');")

  }

// 1: csgo_server_regions
// 2: csgo_server_rank
// 3: csgo_server_roles
// 4: csgo_game_modes
// 5: csgo_kd_ratio

  //insert into friends (user_id, friend_id) values (100,412);

  down () {

  }
}

module.exports = Import_game_names_fields_data_Schema
