'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')
const Settings = use('App/Models/Setting')

class ConnectionController {
  async master_controller({ auth }) {
    if (auth.user) {
      //if we ran this in the last 24 hours, DONT run again!!!!

      const getRunTime = await Database.from('settings')
        .select('gamer_connection_last_runtime', 'id')
        .where({ user_id: auth.user.id })
        .first()

      if (getRunTime == undefined) {
        var newUserSettings = await Settings.create({
          user_id: auth.user.id,
          gamer_connection_last_runtime: new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '),
        })
      }

      //clean up Connection transactions
      this.cleanUpTime({ auth })

      if (Date.now() > new Date(new Date(getRunTime.gamer_connection_last_runtime).getTime() + 60 * 60 * 24 * 1000)) {
        let mysql_friendly_date = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')

        const updateRead_Status = await Settings.query()
          .where({
            id: getRunTime.id,
          })
          .update({ gamer_connection_last_runtime: mysql_friendly_date })

        this.check_if_same_games_in_profile({ auth })
        this.check_if_in_same_communities({ auth })
        this.check_if_in_same_location({ auth })
      }

      return
    } else {
      return 'You are not Logged In!'
    }
  }

  async gamers_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        var getConnections = await Database.from('connections')
          .innerJoin('users', 'users.id', 'connections.other_user_id')
          .select('alias', 'level', 'users.id as id', 'profile_img')
          .where({ user_id: auth.user.id })
          .orderBy('connections.total_score', 'desc')
          .paginate(request.input('counter'), 10)

        if (getConnections.data.length < 11 && parseInt(request.input('counter')) == 1) {
          const showallMyFriends = Database.from('friends')
            .where({ user_id: auth.user.id })
            .select('friends.friend_id as user_id')
          //Don't include gamers who have rejected you and gamers who you have rejected
          const showallMyEnemies = Database.from('exclude_connections')
            .where({ user_id: auth.user.id })
            .select('other_user_id as user_id')

          const showPending = Database.from('notifications')
            .where({ user_id: auth.user.id, activity_type: 1 })
            .select('other_user_id as user_id')

          getConnections = await Database.table('users')
            .select('alias', 'level', 'id', 'profile_img')
            .whereNot({ id: auth.user.id })
            .whereNotIn('users.id', showallMyFriends)
            .whereNotIn('users.id', showallMyEnemies)
            .whereNotIn('users.id', showPending)
            .orderBy('users.level', 'desc')
            .paginate(request.input('counter'), 10)
        }

        return getConnections
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async calculate_score(gamerA_id, gamerB_id, attr) {
    //attr.type: 0 = No record in connections table
    //attr.type: 1 = Record in connections table exist but not in connection_transactions
    //attr.type: 2 = connection_transactions exists but we need to update it

    if (gamerA_id == gamerB_id) {
      return
    }

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

      if (attr.type == 2) {
        const update_vacany = await Connection.query()
          .where({ id: attr.connection_id })
          .increment('total_score', findConnection_criteria.score)

        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  async check_if_in_same_location({ auth }) {
    //find gamers with the same locations as me, orderby Level and limit to 88

    if (auth.user) {
      try {
        const mySearchResults = await Database.table('users')
          .where({ id: auth.user.id })
          .select('country')
          .first()

        if (mySearchResults != undefined) {
          //Don't include your friends
          const showallMyFriends = Database.from('friends')
            .where({ user_id: auth.user.id })
            .select('friends.friend_id as user_id')
          //Don't include gamers who have rejected you and gamers who you have rejected
          const showallMyEnemies = Database.from('exclude_connections')
            .where({ user_id: auth.user.id })
            .select('other_user_id as user_id')

          const showPending = Database.from('notifications')
            .where({ user_id: auth.user.id, activity_type: 1 })
            .select('other_user_id as user_id')

          //Don't include gamers who you already have checked
          const check_all_my_Connections = Database.from('connection_transactions')
            .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
            .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
            .where({ user_id: auth.user.id, criteria: 'check_if_in_same_location', values: true })
            .select('other_user_id as user_id')

          const playerSearchResults = await Database.table('users')
            .select('id as user_id')
            .whereNot({ id: auth.user.id })
            .where({ country: mySearchResults.country })
            .whereNotIn('users.id', showallMyFriends)
            .whereNotIn('users.id', showallMyEnemies)
            .whereNotIn('users.id', showPending)
            .whereNotIn('users.id', check_all_my_Connections)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          for (var x = 0; x < playerSearchResults.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: playerSearchResults[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              this.calculate_score(auth.user.id, playerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_location',
                value: true,
                type: 1,
                connection_id: getConnection.id,
              })
            } else {
              this.calculate_score(auth.user.id, playerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_location',
                value: true,
                type: 0,
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async check_if_in_same_communities({ auth }) {
    //find gamers with the same communities as the ones I'm in, orderby Level and limit to 88

    if (auth.user) {
      try {
        const all_my_groups = await Database.from('usergroups')
          .where('usergroups.user_id', '=', auth.user.id)
          .whereNot('usergroups.permission_level', 42)
          .select('group_id as id')
          .union([
            Database.from('groups')
              .where({
                user_id: auth.user.id,
              })
              .select('id'),
          ])

        //Don't include your friends
        const showallMyFriends = Database.from('friends')
          .where({ user_id: auth.user.id })
          .select('friends.friend_id as user_id')
        //Don't include gamers who have rejected you and gamers who you have rejected
        const showallMyEnemies = Database.from('exclude_connections')
          .where({ user_id: auth.user.id })
          .select('other_user_id as user_id')

        const showPending = Database.from('notifications')
          .where({ user_id: auth.user.id, activity_type: 1 })
          .select('other_user_id as user_id')

        //Don't include gamers who you already have checked
        const check_all_my_Connections = Database.from('connection_transactions')
          .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
          .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
          .where({ user_id: auth.user.id, criteria: 'check_if_in_same_communities', values: true })
          .select('other_user_id as user_id')

        for (var i = 0; i < all_my_groups.length; i++) {
          const gamerSearchResults = await Database.from('usergroups')
            .innerJoin('users', 'users.id', 'usergroups.user_id')
            .select('usergroups.user_id')
            .whereNot('usergroups.user_id', '=', auth.user.id)
            .where('usergroups.group_id', '=', all_my_groups[i].id)
            .whereNotIn('usergroups.user_id', showallMyFriends)
            .whereNotIn('usergroups.user_id', showallMyEnemies)
            .whereNotIn('users.id', showPending)
            .whereNotIn('usergroups.user_id', check_all_my_Connections)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          const gamerSearchResults_groups = await Database.from('groups')
            .innerJoin('users', 'users.id', 'groups.user_id')
            .select('groups.user_id')
            .whereNot('groups.user_id', '=', auth.user.id)
            .where('groups.id', '=', all_my_groups[i].id)
            .whereNotIn('groups.user_id', showallMyFriends)
            .whereNotIn('groups.user_id', showallMyEnemies)
            .whereNotIn('groups.id', showPending)
            .whereNotIn('groups.user_id', check_all_my_Connections)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          for (var x = 0; x < gamerSearchResults.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: gamerSearchResults[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 1,
                connection_id: getConnection.id,
              })
            } else {
              this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 0,
              })
            }
          }

          for (var x = 0; x < gamerSearchResults_groups.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: gamerSearchResults_groups[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              this.calculate_score(auth.user.id, gamerSearchResults_groups[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 1,
                connection_id: getConnection.id,
              })
            } else {
              this.calculate_score(auth.user.id, gamerSearchResults_groups[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 0,
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async check_if_same_games_in_profile({ auth }) {
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

        //Don't include your friends
        const showallMyFriends = Database.from('friends')
          .where({ user_id: auth.user.id })
          .select('friends.friend_id as user_id')
        //Don't include gamers who have rejected you and gamers who you have rejected
        const showallMyEnemies = Database.from('exclude_connections')
          .where({ user_id: auth.user.id })
          .select('other_user_id as user_id')

        const showPending = Database.from('notifications')
          .where({ user_id: auth.user.id, activity_type: 1 })
          .select('other_user_id as user_id')

        //Don't include gamers who you already have checked
        const check_all_my_Connections = Database.from('connection_transactions')
          .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
          .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
          .where({ user_id: auth.user.id, criteria: 'check_if_same_games_in_profile', values: true })
          .select('other_user_id as user_id')

        for (var i = 0; i < rawGames.length; i++) {
          const gamerSearchResults = await Database.from('game_experiences')
            .innerJoin('users', 'users.id', 'game_experiences.user_id')
            .select('game_experiences.user_id')
            .whereNot('game_experiences.user_id', '=', auth.user.id)
            .where('game_experiences.game_names_id', '=', rawGames[i].game_names_id)
            .whereNotIn('game_experiences.user_id', showallMyFriends)
            .whereNotIn('game_experiences.user_id', showallMyEnemies)
            .whereNotIn('game_experiences.user_id', showPending)
            .whereNotIn('game_experiences.user_id', check_all_my_Connections)
            .orderBy('users.created_at', 'desc')
            .limit(88)

          for (var x = 0; x < gamerSearchResults.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: gamerSearchResults[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              // const check_this_Connection = await Database.from('connection_transactions')
              //   .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
              //   .where({ connections_id: getConnection.id, criteria: 'check_if_same_games_in_profile' })
              //   .select('values')
              //   .first()
              // if (check_this_Connection != undefined) {
              //   if (check_this_Connection.values == true) {
              //     continue
              //   }
              // }
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
  async have_I_viewed_this_profile({ auth, request, response }) {
    //everytime I look at a profile to whom I'm not friends/pending with it should increase the points
    // trigger in the profile, if this profile is not mine and we're not friends
    // get the gamer viewed, check if we viewed this in the past 4 hours, if not then add points.
    if (auth.user) {
      try {
        const getConnection = await Database.from('connections')
          .where({ user_id: auth.user.id, other_user_id: request.params.other_user_id })
          .select('id')
          .first()

        if (getConnection == undefined) {
          this.calculate_score(auth.user.id, request.params.other_user_id, {
            criteria: 'have_I_viewed_this_profile',
            value: true,
            type: 0,
          })
        } else {
          const check_all_my_Connections = await Database.from('connection_transactions')
            .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
            .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
            .where({
              user_id: auth.user.id,
              other_user_id: request.params.other_user_id,
              criteria: 'have_I_viewed_this_profile',
              values: true,
            })
            .select('connection_transactions.id as id', 'connection_transactions.updated_at as updated_at')
            .first()

          if (check_all_my_Connections == undefined) {
            this.calculate_score(auth.user.id, request.params.other_user_id, {
              criteria: 'have_I_viewed_this_profile',
              value: true,
              type: 1,
              connection_id: getConnection.id,
            })
            return
          }

          let myTime = new Date(new Date(Date.now()).getTime() - 60 * 60 * 4 * 1000)
          if (check_all_my_Connections.updated_at < myTime) {
            let mysql_friendly_date = new Date()
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')

            const update_my_Connections = await Database.from('connection_transactions')
              .where({
                id: check_all_my_Connections.id,
              })
              .update({ updated_at: mysql_friendly_date })

            this.calculate_score(auth.user.id, request.params.other_user_id, {
              criteria: 'have_I_viewed_this_profile',
              value: true,
              type: 2,
              connection_id: getConnection.id,
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async cleanUpTime({ auth }) {
    // var today = new Date()
    // var priorDate = new Date().setDate(today.getDate() - 90)
    // const cutOff_date = new Date(priorDate)
    try {
      //Don't include your friends
      const showallMyFriends = Database.from('friends')
        .where({ user_id: auth.user.id })
        .select('friends.friend_id as user_id')
      //Don't include gamers who have rejected you and gamers who you have rejected
      const showallMyEnemies = Database.from('exclude_connections')
        .where({ user_id: auth.user.id })
        .select('other_user_id as user_id')

      const delete_noti = await Database.table('connections')
        .where({
          user_id: auth.user.id,
        })
        .whereIn('other_user_id', showallMyFriends)
        .orWhereIn('other_user_id', showallMyEnemies)
        .delete()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ConnectionController
