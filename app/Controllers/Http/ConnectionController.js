'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')

class ConnectionController {
  async gamers_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        //pull data from table, limit to 8
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async master_controller({ auth, request, response }) {
    if (auth.user) {
      this.check_if_same_games_profile({ auth, request, response })
      return 'Got here: Master'
    } else {
      return 'You are not Logged In!'
    }
  }

  async calculate_score(gamerA_id, gamerB_id, score, type) {
    //do a select to see if gamerA and GamerB have a relationship
    //if yes, do an update, otherwise do a insert

    var obj = { check_if_same_profile: false, check_if_same_communites: '', location: false, friends: '', played: '', viewed_profiles: '' }

    switch (data_2_update.type) {
      case 'check_if_same_profile':
        obj.check_if_same_profile = data_2_update.value
        break
      default:
    }

    console.log(obj)
    return
    try {
      const findConnection = await Database.select('fields')
        .from('connections')
        .where({ user_id: gamerA_id, other_user_id: gamerB_id })
        .first()

      // console.log(JSON.parse(findConnection.fields))
      // return

      if (findConnection != undefined) {
        const find_this_type = await Database.select('id')
          .from('connections')
          .select('id')
          .where({ user_id: gamerA_id, other_user_id: gamerB_id, fields: JSON.stringify(type) })
          .first()

        if (find_this_type == undefined) {
          const update_vacany = await Connection.query()
            .where({ user_id: gamerA_id, other_user_id: gamerB_id })
            .update({ fields: JSON.stringify(type) })
        }
      } else {
        //insert
        const followedUser = await Database.table('connections').insert({
          user_id: gamerA_id,
          other_user_id: gamerB_id,
          score: 10,
          fields: JSON.stringify(type),
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async check_if_same_games_profile({ auth, request, response }) {
    //find gamers with the same games as whats in your profile, orderby level and limit to 88
    // +10 points

    if (auth.user) {
      try {
        const rawGames = await Database.select('game_names_id')
          .from('game_experiences')
          .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
          .where('game_experiences.user_id', '=', auth.user.id)
          .whereNot('game_experiences.status', '=', 'Moved On')
          .union([
            Database.select('game_names_id')
              .from('esports_experiences')
              .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
              .where('esports_experiences.user_id', '=', auth.user.id),
          ])
        //console.log(rawGames.length)

        const showallMyFriends = Database.from('friends')
          .where({ user_id: auth.user.id })
          .select('friends.friend_id as user_id')

        for (var i = 0; i < rawGames.length; i++) {
          const gamerSearchResults = await Database.from('game_experiences')
            .innerJoin('users', 'users.id', 'game_experiences.user_id')
            .select('game_experiences.user_id')
            .whereNot('game_experiences.user_id', '=', auth.user.id)
            .where('game_experiences.game_names_id', '=', rawGames[i].game_names_id)
            .whereNotIn('game_experiences.user_id', showallMyFriends)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          for (var x = 0; x < gamerSearchResults.length; x++) {
            this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, 10, { type: 'check_if_same_games_profile', value: true })
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = ConnectionController
