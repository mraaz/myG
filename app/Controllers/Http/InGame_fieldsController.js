'use strict'

const Database = use('Database')

//We still need to ammend any new fields to create and search, everything else is here:

const find_InGame_Fields = async (myScheduledGames) => {
  for (var i = 0; i < myScheduledGames.data.length; i++) {
    var myScheduledTrans = await Database.from('schedule_games_transactions')
      .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
      .where({ schedule_games_id: myScheduledGames.data[i].id })

    for (var x = 0; x < myScheduledTrans.length; x++) {
      switch (myScheduledTrans[x].in_game_field) {
        case 'dota2_medal_ranks':
          myScheduledGames.data[i].dota2_medal_ranks = myScheduledTrans[x].values
          break
        case 'dota2_server_regions':
          myScheduledGames.data[i].dota2_server_regions = myScheduledTrans[x].values
          break
        case 'dota2_roles':
          myScheduledGames.data[i].dota2_roles = myScheduledTrans[x].values
          break
        case 'clash_royale_trophies':
          myScheduledGames.data[i].clash_royale_trophies = myScheduledTrans[x].values
          break
      }
    }
  }
  return myScheduledGames
}

const find_InGame_Fields_NOT_paginate = async (myScheduledGames) => {
  for (var i = 0; i < myScheduledGames.length; i++) {
    var myScheduledTrans = await Database.from('schedule_games_transactions')
      .innerJoin('game_name_fields', 'game_name_fields.id', 'schedule_games_transactions.game_name_fields_id')
      .where({ schedule_games_id: myScheduledGames[i].id })

    for (var x = 0; x < myScheduledTrans.length; x++) {
      switch (myScheduledTrans[x].in_game_field) {
        case 'dota2_medal_ranks':
          myScheduledGames[i].dota2_medal_ranks = myScheduledTrans[x].values
          break
        case 'dota2_server_regions':
          myScheduledGames[i].dota2_server_regions = myScheduledTrans[x].values
          break
        case 'dota2_roles':
          myScheduledGames[i].dota2_roles = myScheduledTrans[x].values
          break
        case 'clash_royale_trophies':
          myScheduledGames[i].clash_royale_trophies = myScheduledTrans[x].values
          break
      }
    }
  }
  return myScheduledGames
}

const find_Archived_InGame_Fields = async (myScheduledGames) => {
  console.log('Made it here')
  for (var i = 0; i < myScheduledGames.length; i++) {
    var myScheduledTrans = await Database.from('archive_schedule_games_trans')
      .innerJoin('game_name_fields', 'game_name_fields.id', 'archive_schedule_games_trans.game_name_fields_id')
      .where({ archive_schedule_games_id: myScheduledGames[i].id })

    for (var x = 0; x < myScheduledTrans.length; x++) {
      switch (myScheduledTrans[x].in_game_field) {
        case 'dota2_medal_ranks':
          myScheduledGames[i].dota2_medal_ranks = myScheduledTrans[x].values
          break
        case 'dota2_server_regions':
          myScheduledGames[i].dota2_server_regions = myScheduledTrans[x].values
          break
        case 'dota2_roles':
          myScheduledGames[i].dota2_roles = myScheduledTrans[x].values
          break
        case 'clash_royale_trophies':
          myScheduledGames[i].clash_royale_trophies = myScheduledTrans[x].values
          break
      }
    }
  }
  return myScheduledGames
}

exports.find_InGame_Fields = find_InGame_Fields
exports.find_InGame_Fields_NOT_paginate = find_InGame_Fields_NOT_paginate
exports.find_Archived_InGame_Fields = find_Archived_InGame_Fields

// exports.getName = getName;
// exports.getLocation = getLocation;
// exports.dob = dateOfBirth;
