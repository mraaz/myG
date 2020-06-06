'use strict'

const Database = use('Database')

//We still need to ammend any new fields to create and search, everything else is here:
const find_InGame_Fields = async (myScheduledGames) => {
  for (var i = 0; i < myScheduledGames.data.length; i++) {
    var myScheduledTrans = await Database.from('schedule_games_transactions')
      .where({ schedule_games_id: myScheduledGames.data[i].id })
      .first()

    if (myScheduledTrans == undefined) {
      continue
    }

    myScheduledGames.data[i].value_one = myScheduledTrans.value_one
    myScheduledGames.data[i].value_two = myScheduledTrans.value_two
    myScheduledGames.data[i].value_three = myScheduledTrans.value_three
    myScheduledGames.data[i].value_four = myScheduledTrans.value_four
    myScheduledGames.data[i].value_five = myScheduledTrans.value_five
  }
  return myScheduledGames
}

const find_InGame_Fields_NOT_paginate = async (myScheduledGames) => {
  for (var i = 0; i < myScheduledGames.length; i++) {
    var myScheduledTrans = await Database.from('schedule_games_transactions')
      .where({ schedule_games_id: myScheduledGames[i].id })
      .first()

    if (myScheduledTrans == undefined) {
      continue
    }

    myScheduledGames[i].value_one = myScheduledTrans.value_one
    myScheduledGames[i].value_two = myScheduledTrans.value_two
    myScheduledGames[i].value_three = myScheduledTrans.value_three
    myScheduledGames[i].value_four = myScheduledTrans.value_four
    myScheduledGames[i].value_five = myScheduledTrans.value_five
  }
  return myScheduledGames
}

const find_Archived_InGame_Fields = async (myScheduledGames) => {
  for (var i = 0; i < myScheduledGames.length; i++) {
    var myScheduledTrans = await Database.from('archive_schedule_games_trans')
      .where({ archive_schedule_games_id: myScheduledGames[i].id })
      .first()

    if (myScheduledTrans == undefined) {
      continue
    }

    myScheduledGames[i].value_one = myScheduledTrans.value_one
    myScheduledGames[i].value_two = myScheduledTrans.value_two
    myScheduledGames[i].value_three = myScheduledTrans.value_three
    myScheduledGames[i].value_four = myScheduledTrans.value_four
    myScheduledGames[i].value_five = myScheduledTrans.value_five
  }
  return myScheduledGames
}

exports.find_InGame_Fields = find_InGame_Fields
exports.find_InGame_Fields_NOT_paginate = find_InGame_Fields_NOT_paginate
exports.find_Archived_InGame_Fields = find_Archived_InGame_Fields
