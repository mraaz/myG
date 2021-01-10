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
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('FIFA 21', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Bloons TD 6', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Call of Duty: Black Ops Cold War', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Monopoly Plus', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Dead by Daylight', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Teamfight Tactics', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Project Winter', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('SMITE', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Genshin Impact', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Sea of Thieves', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Destiny 2', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Black Desert Online', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Garena Free Fire', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('BPM: BULLETS PER MINUTE', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Old School RuneScape', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Phasmophobia', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Stardew Valley', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('FINAL FANTASY XIV Online', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Pokemon HeartGold/SoulSilver', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Magic: The Gathering', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Madden NFL 21', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('DayZ', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Gang Beasts', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Raft', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Golf It!', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('League of Legends: Wild Rift', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Heroes of the Storm', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Tom Clancys Rainbow Six Siege', 1, 1, '1988-08-08', '1988-08-08')")
    .raw("insert into game_names (game_name, user_id, verified, created_at, updated_at) values ('Warhammer: Vermintide 2', 1, 1, '1988-08-08', '1988-08-08')")




//---
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft-390x520.jpg\" where game_name = \"StarCraft\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/StarCraft%20II-390x520.jpg\" where game_name = \"StarCraft II\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Escape%20From%20Tarkov-390x520.jpg\" where game_name = \"Escape From Tarkov\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Rust-390x520.jpg\" where game_name = \"Rust\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20Of%20Duty:%20Modern%20Warfare-390x520.jpg\" where game_name = \"Call of Duty: Modern Warfare 2\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Hades-390x520.jpg\" where game_name = \"Hades\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Super%20Mario%20Maker%202-390x520.jpg\" where game_name = \"Super Mario Maker 2\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/FIFA%2021-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/FIFA%2021-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/FIFA%2021-390x520.jpg\" where game_name = \"FIFA 21\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Bloons%20TD%206-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Bloons%20TD%206-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Bloons%20TD%206-390x520.jpg\" where game_name = \"Bloons TD 6\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20of%20Duty:%20Black%20Ops%20Cold%20War-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20of%20Duty:%20Black%20Ops%20Cold%20War-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Call%20of%20Duty:%20Black%20Ops%20Cold%20War-390x520.jpg\" where game_name = \"Call of Duty: Black Ops Cold War\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Monopoly%20Plus-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Monopoly%20Plus-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Monopoly%20Plus-390x520.jpg\" where game_name = \"Monopoly Plus\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Dead%20by%20Daylight-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Dead%20by%20Daylight-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Dead%20by%20Daylight-390x520.jpg\" where game_name = \"Dead by Daylight\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Teamfight%20Tactics-390x520.jpg\" where game_name = \"Teamfight Tactics\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Project%20Winter-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Project%20Winter-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Project%20Winter-390x520.jpg\" where game_name = \"Project Winter\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/SMITE-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/SMITE-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/SMITE-390x520.jpg\" where game_name = \"SMITE\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-390x520.jpg\" where game_name = \"Rainbow Six Siege\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Genshin%20Impact-390x520.jpg\" where game_name = \"Genshin Impact\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Sea%20of%20Thieves-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Sea%20of%20Thieves-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Sea%20of%20Thieves-390x520.jpg\" where game_name = \"Sea of Thieves\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Destiny%202-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Destiny%202-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Destiny%202-390x520.jpg\" where game_name = \"Destiny 2\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Black%20Desert%20Online-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Black%20Desert%20Online-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Black%20Desert%20Online-390x520.jpg\" where game_name = \"Black Desert Online\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Garena%20Free%20Fire-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Garena%20Free%20Fire-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Garena%20Free%20Fire-390x520.jpg\" where game_name = \"Garena Free Fire\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/BPM:%20BULLETS%20PER%20MINUTE-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/BPM:%20BULLETS%20PER%20MINUTE-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/BPM:%20BULLETS%20PER%20MINUTE-390x520.jpg\" where game_name = \"BPM: BULLETS PER MINUTE\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Old%20School%20RuneScape-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Old%20School%20RuneScape-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Old%20School%20RuneScape-390x520.jpg\" where game_name = \"Old School RuneScape\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Phasmophobia-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Phasmophobia-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Phasmophobia-390x520.jpg\" where game_name = \"Phasmophobia\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Stardew%20Valley-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Stardew%20Valley-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Stardew%20Valley-390x520.jpg\" where game_name = \"Stardew Valley\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/FINAL%20FANTASY%20XIV%20Online-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/FINAL%20FANTASY%20XIV%20Online-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/FINAL%20FANTASY%20XIV%20Online-390x520.jpg\" where game_name = \"FINAL FANTASY XIV Online\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20HeartGold/SoulSilver-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20HeartGold/SoulSilver-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Pok%C3%A9mon%20HeartGold/SoulSilver-390x520.jpg\" where game_name = \"Pokemon HeartGold/SoulSilver\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Magic:%20The%20Gathering-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Magic:%20The%20Gathering-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Magic:%20The%20Gathering-390x520.jpg\" where game_name = \"Magic: The Gathering\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Madden%20NFL%2021-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Madden%20NFL%2021-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Madden%20NFL%2021-390x520.jpg\" where game_name = \"Madden NFL 21\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/DayZ-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/DayZ-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/DayZ-390x520.jpg\" where game_name = \"DayZ\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Phoenix%20Wright:%20Ace%20Attorney-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Phoenix%20Wright:%20Ace%20Attorney-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Phoenix%20Wright:%20Ace%20Attorney-390x520.jpg\" where game_name = \"Phoenix Wright: Ace Attorney\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Gang%20Beasts-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Gang%20Beasts-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Gang%20Beasts-390x520.jpg\" where game_name = \"Gang Beasts\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Raft-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Raft-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Raft-390x520.jpg\" where game_name = \"Raft\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Golf%20It%21-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Golf%20It%21-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Golf%20It%21-390x520.jpg\" where game_name = \"Golf It!\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends:%20Wild%20Rift-390x520.jpg\" where game_name = \"League of Legends: Wild Rift\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Heroes%20of%20the%20Storm-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Heroes%20of%20the%20Storm-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Heroes%20of%20the%20Storm-390x520.jpg\" where game_name = \"Heroes of the Storm\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Tom%20Clancy%27s%20Rainbow%20Six%20Siege-390x520.jpg\" where game_name = \"Tom Clancys Rainbow Six Siege\"")
    .raw("update game_names set game_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Warhammer:%20Vermintide%202-170x90.jpg\", game_artwork = \"https://static-cdn.jtvnw.net/ttv-boxart/Warhammer:%20Vermintide%202-90x120.jpg\", game_name_fields_img = \"https://static-cdn.jtvnw.net/ttv-boxart/Warhammer:%20Vermintide%202-390x520.jpg\" where game_name = \"Warhammer: Vermintide 2\"")


  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
