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
      //if we ran this in the last 24 hours, DONT run again!!!!

      this.check_if_same_games_profile({ auth, request, response })
      return 'Got here: Master'
    } else {
      return 'You are not Logged In!'
    }
  }

  async calculate_score(gamerA_id, gamerB_id, attr) {
    //attr.type: 0 = No record in connections table
    //attr.type: 1 = Record in connections table exist but not in connection_transactions
    //attr.type: 2 = connection_transactions exists but we need to update it

    try {
      const findConnection_criteria = await Database.from('connection_criterias')
        .select('id', 'score')
        .where({ criteria: attr.criteria })
        .first()
      if (findConnection_criteria == undefined) {
        return
      }

      if (attr.type == 0) {
        const createNewEntry = await Database.table('connections').insert({
          user_id: gamerA_id,
          other_user_id: gamerB_id,
          total_score: findConnection_criteria.score,
        })

        const createNewTransaction = await Database.table('connection_transactions').insert({
          connections_id: createNewEntry,
          connection_criterias_id: findConnection_criteria.id,
          values: attr.value,
        })

        return
      }
      if (attr.type == 1) {
        const createNewTransaction = await Database.table('connection_transactions').insert({
          connections_id: attr.connection_id,
          connection_criterias_id: findConnection_criteria.id,
          values: attr.value,
        })

        const update_vacany = await Connection.query()
          .where({ id: attr.connection_id })
          .increment('total_score', findConnection_criteria.score)

        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  async check_if_same_games_profile({ auth, request, response }) {
    //find gamers with the same games as whats in your profile, orderby level and limit to 88

    if (auth.user) {
      try {
        const rawGames = await Database.from('game_experiences')
          .select('game_names_id')
          .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
          .where('game_experiences.user_id', '=', auth.user.id)
          .whereNot('game_experiences.status', '=', 'Moved On')
          .union([
            Database.select('game_names_id')
              .from('esports_experiences')
              .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
              .where('esports_experiences.user_id', '=', auth.user.id),
          ])

        const showallMyFriends = Database.from('friends')
          .where({ user_id: auth.user.id })
          .select('friends.friend_id as user_id')

        const showallMyEnemies = Database.from('exclude_connections')
          .where({ user_id: auth.user.id })
          .select('other_user_id as user_id')

        for (var i = 0; i < rawGames.length; i++) {
          const gamerSearchResults = await Database.from('game_experiences')
            .innerJoin('users', 'users.id', 'game_experiences.user_id')
            .select('game_experiences.user_id')
            .whereNot('game_experiences.user_id', '=', auth.user.id)
            .where('game_experiences.game_names_id', '=', rawGames[i].game_names_id)
            .whereNotIn('game_experiences.user_id', showallMyFriends)
            .whereNotIn('game_experiences.user_id', showallMyEnemies)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          for (var x = 0; x < gamerSearchResults.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: gamerSearchResults[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              const check_this_Connection = await Database.from('connection_transactions')
                .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
                .where({ connections_id: getConnection.id, criteria: 'check_if_same_games_in_profile' })
                .select('values')
                .first()
              if (check_this_Connection != undefined) {
                if (check_this_Connection.values == true) {
                  continue
                }
              }
              this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_same_games_in_profile',
                value: true,
                type: 1,
                connection_id: getConnection.id,
              })
            } else {
              this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_same_games_in_profile',
                value: true,
                type: 0,
              })
            }
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
