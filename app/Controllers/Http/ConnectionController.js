'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')
const Settings = use('App/Models/Setting')
const GroupConnectionController = use('./GroupConnectionController')

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
        return
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
        this.calc_communities_you_might_know({ auth })
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

  async communities_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        var getCommunities = await Database.from('group_connections')
          .innerJoin('groups', 'groups.id', 'group_connections.group_id')
          .where({ type: 1 })
          .where('group_connections.user_id', '=', auth.user.id)
          .paginate(request.input('counter'), 10)

        return getCommunities
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async calc_communities_you_might_know({ auth }) {
    // Find Public communities which are the most populated and ofc which I'm not in
    // Find public communities which my friends are in and ofc which I'm not in

    //ToDO: https://github.com/mraaz/myGame/issues/241

    if (auth.user) {
      try {
        const subquery = Database.select('id')
          .from('groups')
          .where({ user_id: auth.user.id })

        const showallMyFriends = Database.from('friends')
          .where({ user_id: auth.user.id })
          .select('friends.friend_id as user_id')

        let groups_my_friends_are_in = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('groups.type', '=', 1)
          .whereNot('usergroups.user_id', '=', auth.user.id)
          .whereNot('usergroups.permission_level', 42)
          .whereNotIn('usergroups.group_id', subquery)
          .whereIn('usergroups.user_id', showallMyFriends)
          .groupBy('group_id')
          .select('group_id')
          .count('* as no_of_members')
          .orderBy('no_of_members', 'desc')
          .limit(888)

        let popin_groups = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('groups.type', '=', 1)
          .whereNot('usergroups.user_id', '=', auth.user.id)
          .whereNot('usergroups.permission_level', 42)
          .whereNotIn('usergroups.group_id', subquery)
          .groupBy('group_id')
          .select('group_id')
          .count('* as no_of_members')
          .orderBy('no_of_members', 'desc')
          .limit(288)

        let tmp_popin_groups = popin_groups
        let popin_groups_size = 0

        //Let's do 80/20 split groups_my_friends_are_in for 80.

        if (groups_my_friends_are_in.length > 200) {
          let tmpVal = 0
          if (groups_my_friends_are_in.length * 0.8 > 250) {
            tmpVal = 250
          } else {
            tmpVal = groups_my_friends_are_in.length * 0.8
          }
          groups_my_friends_are_in = groups_my_friends_are_in.slice(0, tmpVal)
          if (popin_groups.length > 50) {
            popin_groups = popin_groups.slice(0, 50)
            popin_groups_size = 50
          }
        } else {
          popin_groups = popin_groups.slice(0, 250 - groups_my_friends_are_in.length)
          popin_groups_size = 250 - groups_my_friends_are_in.length
        }

        const _1stpass = [...groups_my_friends_are_in, ...popin_groups]

        var mySet = new Set()
        for (var i = 0; i < _1stpass.length; i++) {
          mySet.add(_1stpass[i])
        }

        if (mySet.size < 250) {
          for (var x = popin_groups_size; mySet.size < 250; x++) {
            if (x < tmp_popin_groups.length) {
              mySet.add(tmp_popin_groups[x])
            } else {
              break
            }
          }
        }

        let myArr = [...mySet]
        myArr = await this.shuffle(myArr)

        let groupConnectionController = new GroupConnectionController()

        for (var i = 0; i < myArr.length; i++) {
          groupConnectionController.store({ auth }, myArr[i].group_id, myArr[i].no_of_members)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
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

      const group_connections = await Database.from('group_connections')
        .where({ user_id: auth.user.id })
        .count('* as no_of_group_connections')

      if (group_connections[0].no_of_group_connections > 288) {
        var today = new Date()
        var priorDate = new Date().setDate(today.getDate() - 30)
        const cutOff_date = new Date(priorDate)

        const get_stale_group_connections = await Database.from('group_connections')
          .where({ user_id: auth.user.id })
          .where('updated_at', '<', cutOff_date)
          .delete()
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ConnectionController
