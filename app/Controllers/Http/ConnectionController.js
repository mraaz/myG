'use strict'

const Database = use('Database')
const Connection = use('App/Models/Connection')
const Settings = use('App/Models/Setting')
const GroupConnectionController = use('./GroupConnectionController')
const LoggingRepository = require('../../Repositories/Logging')

const CommonController = use('./CommonController')

class ConnectionController {
  async master_controller({ auth }) {
    if (auth.user) {
      const getRunTime = await Database.from('settings')
        .select('gamer_connection_last_runtime', 'id')
        .where({ user_id: auth.user.id })
        .first()

      if (getRunTime == undefined) {
        var newUserSettings = await Settings.create({
          user_id: auth.user.id,
          gamer_connection_last_runtime: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
        this.check_if_same_games_in_profile({ auth })
        this.check_if_in_same_communities({ auth })
        this.check_if_in_same_location({ auth })
        this.myCommon_friends({ auth })
        this.calc_communities_you_might_know({ auth })
        this.have_we_played_together({ auth })
        return
      }

      //clean up Connection transactions
      this.cleanUpTime({ auth })

      if (Date.now() > new Date(new Date(getRunTime.gamer_connection_last_runtime).getTime() + 60 * 60 * 24 * 1000)) {
        let mysql_friendly_date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const updateRead_Status = await Settings.query()
          .where({
            id: getRunTime.id
          })
          .update({ gamer_connection_last_runtime: mysql_friendly_date })

        this.check_if_same_games_in_profile({ auth })
        this.check_if_in_same_communities({ auth })
        this.check_if_in_same_location({ auth })
        this.myCommon_friends({ auth })
        this.calc_communities_you_might_know({ auth })
        this.have_we_played_together({ auth })
      }

      return
    } else {
      return 'You are not Logged In!'
    }
  }

  async gamers_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        let getConnections = await Database.from('connections')
          .innerJoin('users', 'users.id', 'connections.other_user_id')
          .select('alias', 'level', 'users.id as id', 'profile_img')
          .where({ user_id: auth.user.id })
          .orderBy('connections.total_score', 'desc')
          .paginate(request.input('counter'), 10)

        if (getConnections.data.length < 11 && parseInt(request.input('counter')) == 1) {
          const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
          //Don't include gamers who have rejected you and gamers who you have rejected
          const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

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
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async these_you_might_want_to_follow({ auth }) {
    if (auth.user) {
      try {
        const influencers = await Database.from('followers')
          .leftJoin('users', 'users.id', 'followers.user_id')
          .leftJoin('groups', 'groups.id', 'followers.group_id')
          .select(
            'users.alias',
            'users.level',
            'users.id as user_id',
            'users.profile_img as user_profile_img',
            'groups.id as group_id',
            'group_img',
            'name as group_name'
          )
          .groupBy('follower_id')
          .count('* as no_of_followers')
          .orderBy('no_of_followers', 'desc')
          .limit(10)

        console.log(influencers, '<<<influencers')

        //loop thru array
        //determine if user or group
        //get relevant info
        //if user: alias, level id, profile imge
        //if group: group name, group image, number of members

        // return getConnections

        // presumably you wanted to return the influencers?
        return influencers;

      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async communities_you_might_know({ auth, request, response }) {
    if (auth.user) {
      try {
        let getCommunities = await Database.from('group_connections')
          .innerJoin('groups', 'groups.id', 'group_connections.group_id')
          .where({ type: 1 })
          .where('group_connections.user_id', '=', auth.user.id)
          .paginate(request.input('counter'), 25)

        getCommunities = getCommunities.data

        for (let i = 0; i < getCommunities.length; i++) {
          const myPeeps = await Database.from('usergroups')
            .where({
              group_id: getCommunities[i].id
            })
            .count('* as no_of_peeps')

          getCommunities[i].no_of_peeps = myPeeps[0].no_of_peeps
        }
        return getCommunities
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
        const subquery = Database.select('id').from('groups').where({ user_id: auth.user.id })

        const subquery_2 = Database.select('group_id').from('usergroups').where({ user_id: auth.user.id })

        const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')

        const get_my_games = Database.from('game_experiences').where('user_id', '=', auth.user.id).select('game_names_id')

        let groups_my_friends_are_in = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('groups.type', '=', 1)
          .whereNot('usergroups.permission_level', 42)
          .whereNotIn('usergroups.group_id', subquery)
          .whereNotIn('usergroups.group_id', subquery_2)
          .whereIn('usergroups.user_id', showallMyFriends)
          .groupBy('group_id')
          .select('group_id')
          .count('* as no_of_members')
          .orderBy('no_of_members', 'desc')
          .limit(888)

        let popin_groups = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('groups.type', '=', 1)
          .whereNot('usergroups.permission_level', 42)
          .whereNotIn('usergroups.group_id', subquery)
          .whereNotIn('usergroups.group_id', subquery_2)
          .groupBy('group_id')
          .select('group_id')
          .count('* as no_of_members')
          .orderBy('no_of_members', 'desc')
          .limit(288)

        let my_gaming_grps = await Database.from('groups')
          .leftJoin('usergroups', 'usergroups.group_id', 'groups.id')
          .whereNot('groups.user_id', auth.user.id)
          .whereNotIn('usergroups.group_id', subquery_2)
          .whereIn('groups.game_names_id', get_my_games)
          .select('groups.id as group_id')
          .limit(20)

        let tmp_popin_groups = popin_groups
        let popin_groups_size = 0

        //Let's do 60/20 split groups_my_friends_are_in for 80.

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

        const _1stpass = [...groups_my_friends_are_in, ...popin_groups, ...my_gaming_grps]

        let mySet = new Set()
        for (var i = 0; i < _1stpass.length; i++) {
          mySet.add(_1stpass[i])
        }

        if (mySet.size < 250) {
          for (let x = popin_groups_size; mySet.size < 250; x++) {
            if (x < tmp_popin_groups.length) {
              mySet.add(tmp_popin_groups[x])
            } else {
              break
            }
          }
        }

        let myArr = [...mySet]

        const common_Controller = new CommonController()
        myArr = await common_Controller.shuffle(myArr)
        if (myArr.length < 10) {
          let random_grps = await Database.from('groups')
            .leftJoin('usergroups', 'usergroups.group_id', 'groups.id')
            .whereNot('groups.user_id', auth.user.id)
            .whereNotIn('usergroups.group_id', subquery_2)
            .select('groups.id as group_id')
            .orderBy('groups.created_at', 'asc')
            .limit(88)

          myArr = [...myArr, ...random_grps]
        }
        const groupConnectionController = new GroupConnectionController()

        for (let i = 0; i < myArr.length; i++) {
          groupConnectionController.store({ auth }, myArr[i].group_id, myArr[i].no_of_members)
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
          total_score: findConnection_criteria.score
        })

        const createNewTransaction = await Database.table('connection_transactions').insert({
          connections_id: createNewEntry,
          connection_criterias_id: findConnection_criteria.id,
          values: attr.value
        })

        return
      }
      if (attr.type == 1) {
        const createNewTransaction = await Database.table('connection_transactions').insert({
          connections_id: attr.connection_id,
          connection_criterias_id: findConnection_criteria.id,
          values: attr.value
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }

  async check_if_in_same_location({ auth }) {
    //find gamers with the same locations as me, orderby Level and limit to 88

    if (auth.user) {
      try {
        const mySearchResults = await Database.table('users').where({ id: auth.user.id }).select('country').first()

        if (mySearchResults != undefined) {
          //Don't include your friends
          const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
          //Don't include gamers who have rejected you and gamers who you have rejected
          const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

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
              await this.calculate_score(auth.user.id, playerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_location',
                value: true,
                type: 1,
                connection_id: getConnection.id
              })
            } else {
              await this.calculate_score(auth.user.id, playerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_location',
                value: true,
                type: 0
              })
            }
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  // Establish Connections between User and Friends of Friends.
  async myCommon_friends({ auth }) {
    if (auth.user) {
      try {
        // Connections to Exclude.
        const showallMyEnemies = await Database.from('exclude_connections')
          .where({ user_id: auth.user.id })
          .select('other_user_id as user_id')

        const existingConnections = await Database.from('connection_transactions')
          .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
          .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
          .where({ user_id: auth.user.id, criteria: 'myCommon_friends', values: true })
          .select('other_user_id as user_id')

        // const enemiesIds = enemies.map((enemy) => enemy.user_id)
        // const existingConnectionsIds = existingConnections.map((connection) => connection.user_id)
        // const connectionsToIgnore = [auth.user.id, ...enemiesIds, ...existingConnectionsIds]

        // Connections to Include.
        // const friends = await Database.from('friends')
        //   .where({ user_id: auth.user.id })
        //   .select('friends.friend_id as user_id')
        //const friendsIds = friends.map((friend) => friend.user_id)

        const subquery = Database.from('friends').where({ user_id: auth.user.id }).select('friend_id')

        const friendsOfFriends = await Database.from('friends')
          .whereNotIn('friend_id', subquery)
          .whereNotIn('user_id', showallMyEnemies)
          .whereNotIn('user_id', existingConnections)
          .whereNot({ user_id: auth.user.id, friend_id: auth.user.id })
          .whereIn('user_id', subquery)
          .select('friends.friend_id as user_id')

        //const friendsOfFriendsIds = friendsOfFriends.map((friend) => friend.user_id).filter((id) => !connectionsToIgnore.includes(id))

        // Establish Connections
        for (var i = 0; i < friendsOfFriends.length; i++) {
          const existingConnection = await Database.from('connections')
            .where({ user_id: auth.user.id, other_user_id: friendsOfFriends[i].user_id })
            .select('id')
            .first()
          //console.log(`Testing Connection between ${auth.user.id} and ${friendsOfFriends[i].user_id} -> ${!!existingConnection}`)
          if (existingConnection != undefined) {
            await this.calculate_score(auth.user.id, friendsOfFriends[i].user_id, {
              criteria: 'myCommon_friends',
              value: true,
              type: 1,
              connection_id: existingConnection.id
            })
          } else {
            await this.calculate_score(auth.user.id, friendsOfFriends[i].user_id, {
              criteria: 'myCommon_friends',
              value: true,
              type: 0
            })
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
                user_id: auth.user.id
              })
              .select('id')
          ])

        //Don't include your friends
        const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
        //Don't include gamers who have rejected you and gamers who you have rejected
        const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

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
              await this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 1,
                connection_id: getConnection.id
              })
            } else {
              await this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 0
              })
            }
          }

          for (var x = 0; x < gamerSearchResults_groups.length; x++) {
            const getConnection = await Database.from('connections')
              .where({ user_id: auth.user.id, other_user_id: gamerSearchResults_groups[x].user_id })
              .select('id')
              .first()

            if (getConnection != undefined) {
              await this.calculate_score(auth.user.id, gamerSearchResults_groups[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 1,
                connection_id: getConnection.id
              })
            } else {
              await this.calculate_score(auth.user.id, gamerSearchResults_groups[x].user_id, {
                criteria: 'check_if_in_same_communities',
                value: true,
                type: 0
              })
            }
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
              .where('esports_experiences.user_id', '=', auth.user.id)
          ])

        //Don't include your friends
        const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
        //Don't include gamers who have rejected you and gamers who you have rejected
        const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

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
              await this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_same_games_in_profile',
                value: true,
                type: 1,
                connection_id: getConnection.id
              })
            } else {
              await this.calculate_score(auth.user.id, gamerSearchResults[x].user_id, {
                criteria: 'check_if_same_games_in_profile',
                value: true,
                type: 0
              })
            }
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
          await this.calculate_score(auth.user.id, request.params.other_user_id, {
            criteria: 'have_I_viewed_this_profile',
            value: true,
            type: 0
          })
        } else {
          const check_all_my_Connections = await Database.from('connection_transactions')
            .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
            .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
            .where({
              user_id: auth.user.id,
              other_user_id: request.params.other_user_id,
              criteria: 'have_I_viewed_this_profile',
              values: true
            })
            .select('connection_transactions.id as id', 'connection_transactions.updated_at as updated_at')
            .first()

          if (check_all_my_Connections == undefined) {
            await this.calculate_score(auth.user.id, request.params.other_user_id, {
              criteria: 'have_I_viewed_this_profile',
              value: true,
              type: 1,
              connection_id: getConnection.id
            })
            return
          }

          let myTime = new Date(new Date(Date.now()).getTime() - 60 * 60 * 4 * 1000)
          if (check_all_my_Connections.updated_at < myTime) {
            let mysql_friendly_date = new Date().toISOString().slice(0, 19).replace('T', ' ')

            const update_my_Connections = await Database.from('connection_transactions')
              .where({
                id: check_all_my_Connections.id
              })
              .update({ updated_at: mysql_friendly_date })

            await this.calculate_score(auth.user.id, request.params.other_user_id, {
              criteria: 'have_I_viewed_this_profile',
              value: true,
              type: 2,
              connection_id: getConnection.id
            })
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async have_we_played_together({ auth }) {
    //Loop thru all completed games for this user since the last run date(created and partcipated), find all players in that game and increment points
    //last run date will be: get one record from connections for this user orderBy updated desc. user this date to get all games played.
    if (auth.user) {
      try {
        let myLastrunDate = ''

        const getLastrunConnection = await Database.from('connection_transactions')
          .innerJoin('connections', 'connections.id', 'connection_transactions.connections_id')
          .innerJoin('connection_criterias', 'connection_criterias.id', 'connection_transactions.connection_criterias_id')
          .where({ user_id: auth.user.id, criteria: 'have_we_played_together', values: true })
          .select('connection_transactions.updated_at')
          .orderBy('connection_transactions.updated_at', 'desc')
          .first()

        if (getLastrunConnection == undefined) {
          myLastrunDate = '1981-03-19 00:00:00'
        } else {
          myLastrunDate = getLastrunConnection.updated_at
        }
        let mysql_friendly_date = new Date().toISOString().slice(0, 19).replace('T', ' ')

        const get_all_my_games = Database.from('attendees')
          .innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id')
          .select('schedule_games.id')
          .where('attendees.user_id', '=', auth.user.id, 'type', '=', 1)
          .where('schedule_games.end_date_time', '<=', mysql_friendly_date)
          .where('schedule_games.end_date_time', '>', myLastrunDate)

        //Don't include your friends
        const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
        //Don't include gamers who have rejected you and gamers who you have rejected
        const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

        const showPending = Database.from('notifications')
          .where({ user_id: auth.user.id, activity_type: 1 })
          .select('other_user_id as user_id')

        const gamers_in_these_games = await Database.from('attendees')
          .where({ type: 1 })
          .whereIn('attendees.schedule_games_id', get_all_my_games)
          .select('user_id')
          .whereNot({ user_id: auth.user.id })
          .whereNotIn('user_id', showallMyFriends)
          .whereNotIn('user_id', showallMyEnemies)
          .whereNotIn('user_id', showPending)

        for (var x = 0; x < gamers_in_these_games.length; x++) {
          const getConnection = await Database.from('connections')
            .where({ user_id: auth.user.id, other_user_id: gamers_in_these_games[x].user_id })
            .select('id')
            .first()

          if (getConnection != undefined) {
            await this.calculate_score(auth.user.id, gamers_in_these_games[x].user_id, {
              criteria: 'have_we_played_together',
              value: true,
              type: 1,
              connection_id: getConnection.id
            })
          } else {
            await this.calculate_score(auth.user.id, gamers_in_these_games[x].user_id, {
              criteria: 'have_we_played_together',
              value: true,
              type: 0
            })
          }
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
      }
    }
  }

  async cleanUpTime({ auth }) {
    try {
      //Don't include your friends
      const showallMyFriends = Database.from('friends').where({ user_id: auth.user.id }).select('friends.friend_id as user_id')
      //Don't include gamers who have rejected you and gamers who you have rejected
      const showallMyEnemies = Database.from('exclude_connections').where({ user_id: auth.user.id }).select('other_user_id as user_id')

      //Delete friends and exluded connections
      const delete_noti = await Database.table('connections')
        .where({
          user_id: auth.user.id
        })
        .whereIn('other_user_id', showallMyFriends)
        .orWhereIn('other_user_id', showallMyEnemies)
        .delete()

      //Cleam up connections, we don't want more than 500
      var today = new Date()
      var priorDate = new Date().setDate(today.getDate() - 60)
      const cutOff_date = new Date(priorDate)

      const total_connections = await Database.table('connections')
        .where('updated_at', '<', cutOff_date)
        .where({
          user_id: auth.user.id
        })
        .count('* as total_count')

      if (total_connections[0].total_count > 288) {
        const get_connection = await Database.table('connections')
          .where({
            user_id: auth.user.id
          })
          .where('updated_at', '<', cutOff_date)
          .select('updated_at')
          .orderBy('updated_at', 'desc')
          .limit(1)
          .offset(287)

        const delete_connections = await Database.table('connections')
          .where({
            user_id: auth.user.id
          })
          .where('updated_at', '<', get_connection[0].updated_at)
          .delete()
      }

      //Clean up group connections, we don't want more than 288
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }
}

module.exports = ConnectionController
