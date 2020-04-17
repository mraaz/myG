'use strict'

const Database = use('Database')
const UserStatTransaction = use('App/Models/UserStatTransaction')

const GREAT_COMMUNITY_SIZE = 100
const CUT_OFF_FOR_ATTENDEES_FOR_GAME = 1 //2 OR MORE
const CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME = 4 //5 OR MORE

class UserStatTransactionController {
  async master_controller({ auth, request, response }) {
    // Stats to send are:
    // Connection: Friends and communities
    // Follower: Followers
    // Games: Games hosted and Games played
    // Likes: Likes
    // Commendations: commendations
    if (auth.user) {
      const getmyStats = await Database.from('user_stat_transactions')
        .innerJoin('user_stats', 'user_stats.id', 'user_stat_transactions.user_stat_id')
        .where({ user_id: auth.user.id })

      let total_number_of_friends = 0,
        total_number_of_communities = 0,
        total_number_of_great_communities = 0,
        total_number_of_followers = 0,
        total_number_of_games_hosted = 0,
        total_number_of_games_played = 0,
        total_number_of_great_games_hosted = 0,
        total_number_of_great_games_played = 0,
        total_number_of_likes = 0,
        total_number_of_commendations = 0,
        last_months_total_number_of_friends = 0,
        last_months_total_number_of_communities = 0,
        last_months_total_number_of_great_communities = 0,
        last_months_total_number_of_followers = 0,
        last_months_total_number_of_games_hosted = 0,
        last_months_total_number_of_games_played = 0,
        last_months_total_number_of_great_games_hosted = 0,
        last_months_total_number_of_great_games_played = 0,
        last_months_total_number_of_likes = 0,
        last_months_total_number_of_commendations = 0

      for (var i = 0; i < getmyStats.length; i++) {
        switch (getmyStats[i].criteria) {
          case 'total_number_of_friends':
            total_number_of_friends = parseInt(parseInt(getmyStats[i].values))
            last_months_total_number_of_friends = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_communities':
            total_number_of_communities = parseInt(getmyStats[i].values)
            last_months_total_number_of_communities = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_great_communities':
            total_number_of_great_communities = parseInt(getmyStats[i].values)
            last_months_total_number_of_great_communities = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_followers':
            total_number_of_followers = parseInt(getmyStats[i].values)
            last_months_total_number_of_followers = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_games_hosted':
            total_number_of_games_hosted = parseInt(getmyStats[i].values)
            last_months_total_number_of_games_hosted = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_games_played':
            total_number_of_games_played = parseInt(getmyStats[i].values)
            last_months_total_number_of_games_played = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_great_games_hosted':
            total_number_of_great_games_hosted = parseInt(getmyStats[i].values)
            last_months_total_number_of_great_games_hosted = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_great_games_played':
            total_number_of_great_games_played = parseInt(getmyStats[i].values)
            last_months_total_number_of_great_games_played = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_likes':
            total_number_of_likes = parseInt(getmyStats[i].values)
            last_months_total_number_of_likes = parseInt(getmyStats[i].last_month_values)
            break
          case 'total_number_of_commendations':
            total_number_of_commendations = parseInt(getmyStats[i].values)
            last_months_total_number_of_commendations = parseInt(getmyStats[i].last_month_values)
            break
        }
      }

      return {
        connections: total_number_of_friends + total_number_of_communities + total_number_of_great_communities,
        last_month_connections:
          last_months_total_number_of_friends + last_months_total_number_of_communities + last_months_total_number_of_great_communities,
        followers: total_number_of_followers,
        last_month_followers: last_months_total_number_of_followers,
        games:
          total_number_of_games_hosted +
          total_number_of_great_games_hosted +
          total_number_of_games_played +
          total_number_of_great_games_played,
        last_month_games:
          last_months_total_number_of_games_hosted +
          last_months_total_number_of_great_games_hosted +
          last_months_total_number_of_games_played +
          last_months_total_number_of_great_games_played,
        likes: total_number_of_likes,
        last_month_likes: last_months_total_number_of_likes,
        commendations: total_number_of_commendations,
        last_month_commendations: last_months_total_number_of_commendations,
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async update_total_number_of(my_user_id, criteria) {
    let value_to_be_updated = 0,
      great_value_to_be_updated = 0
    let mysql_friendly_date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    try {
      switch (criteria) {
        case 'total_number_of_friends':
          const getCount_total_number_of_friends = await Database.from('friends')
            .where({ user_id: my_user_id })
            .count('id as total_count')

          if (getCount_total_number_of_friends.length != 0) {
            value_to_be_updated = getCount_total_number_of_friends[0].total_count
          }
          break
        case 'total_number_of_communities':
          const getCount_total_number_of_communities = await Database.from('usergroups')
            .where('usergroups.user_id', '=', my_user_id)
            .whereNot('usergroups.permission_level', 42)
            .count('id as total_count')
            .union([
              Database.from('groups')
                .where({
                  user_id: my_user_id,
                })
                .count('id as total_count'),
            ])

          if (getCount_total_number_of_communities.length != 0) {
            value_to_be_updated = getCount_total_number_of_communities[0].total_count + getCount_total_number_of_communities[1].total_count
          }
          break
        case 'total_number_of_great_communities':
          const getCount_total_number_of_great_communities = await Database.from('usergroups')
            .select('group_id')
            .count('id as total_count')
            .groupBy('group_id')

          let great_communities_arr = []

          for (var i = 0; i < getCount_total_number_of_great_communities.length; i++) {
            if (getCount_total_number_of_great_communities[i].total_count > GREAT_COMMUNITY_SIZE) {
              great_communities_arr.push(getCount_total_number_of_great_communities[i].group_id)
            }
          }
          const getCount_usergroups = await Database.from('usergroups')
            .whereIn('group_id', great_communities_arr)
            .where({ user_id: my_user_id })
            .whereNot('permission_level', 42)
            .count('id as total_count')
            .union([
              Database.from('groups')
                .where({
                  user_id: my_user_id,
                })
                .whereIn('id', great_communities_arr)
                .count('id as total_count'),
            ])

          if (getCount_usergroups.length != 0) {
            value_to_be_updated = getCount_usergroups[0].total_count + getCount_usergroups[1].total_count
          }
          break
        case 'total_number_of_followers':
          const getCount_total_number_of_followers = await Database.from('followers')
            .where({ follower_id: my_user_id })
            .count('id as total_count')
          if (getCount_total_number_of_followers.length != 0) {
            value_to_be_updated = getCount_total_number_of_followers[0].total_count
          }
          break
        case 'total_number_of_great_games_hosted':
        case 'total_number_of_games_hosted':
          const getGames = Database.from('schedule_games')
            .select('id')
            .where({ user_id: my_user_id })
            .where('end_date_time', '<=', mysql_friendly_date)

          const getCount_total_number_of_games_hosted = await Database.from('attendees')
            .select('id')
            .where({ type: 1 })
            .whereIn('schedule_games_id', getGames)
            .count('id as total_count')
            .groupBy('schedule_games_id')

          var tmp_count = 0
          var great_tmp_count = 0

          for (var i = 0; i < getCount_total_number_of_games_hosted.length; i++) {
            if (getCount_total_number_of_games_hosted[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME) {
              great_tmp_count++
            }
            if (
              getCount_total_number_of_games_hosted[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GAME &&
              getCount_total_number_of_games_hosted[i].total_count <= CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME
            ) {
              tmp_count++
            }
          }

          const getArchived_Games = Database.from('archive_schedule_games')
            .select('archive_schedule_game_id')
            .where({ user_id: my_user_id })
            .where('end_date_time', '<=', mysql_friendly_date)

          const getArchiveCount = await Database.from('archive_attendees')
            .select('id')
            .where({ type: 1 })
            .whereIn('archive_schedule_game_id', getArchived_Games)
            .count('id as total_count')
            .groupBy('archive_schedule_game_id')

          var archive_tmp = 0
          var great_archive_tmp = 0

          for (var x = 0; x < getArchiveCount.length; x++) {
            if (getArchiveCount[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME) {
              great_archive_tmp++
            }
            if (
              getArchiveCount[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GAME &&
              getArchiveCount[i].total_count <= CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME
            ) {
              archive_tmp++
            }
          }

          if (great_tmp_count + great_archive_tmp != 0) {
            great_value_to_be_updated = great_tmp_count + great_archive_tmp
          }

          if (archive_tmp + tmp_count != 0) {
            value_to_be_updated = archive_tmp + tmp_count
          }
          break
        case 'total_number_of_great_games_played':
        case 'total_number_of_games_played':
          const getmyGames = Database.from('attendees')
            .innerJoin('schedule_games', 'schedule_games.id', 'attendees.schedule_games_id')
            .select('attendees.schedule_games_id')
            .where({ type: 1 })
            .where('attendees.user_id', '=', my_user_id)
            .where('end_date_time', '<=', mysql_friendly_date)

          const getCount_total_number_of_games_played = await Database.from('attendees')
            .select('id')
            .where({ type: 1 })
            .whereIn('schedule_games_id', getmyGames)
            .count('id as total_count')
            .groupBy('schedule_games_id')

          var tmp_count_games_played = 0
          var great_tmp_count_games_played = 0

          for (var i = 0; i < getCount_total_number_of_games_played.length; i++) {
            if (getCount_total_number_of_games_played[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME) {
              great_tmp_count_games_played++
            }
            if (
              getCount_total_number_of_games_played[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GAME &&
              getCount_total_number_of_games_played[i].total_count <= CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME
            ) {
              tmp_count_games_played++
            }
          }

          const getArchivedmyGames = Database.from('archive_attendees')
            .innerJoin(
              'archive_schedule_games',
              'archive_schedule_games.archive_schedule_game_id',
              'archive_attendees.archive_schedule_game_id'
            )
            .select('archive_attendees.archive_schedule_game_id')
            .where({ type: 1 })
            .where('archive_attendees.user_id', '=', my_user_id)
            .where('end_date_time', '<=', mysql_friendly_date)

          const getCount_archived_attendees = await Database.from('archive_attendees')
            .select('id')
            .where({ type: 1 })
            .whereIn('archive_schedule_game_id', getArchivedmyGames)
            .count('id as total_count')
            .groupBy('archive_schedule_game_id')

          var great_archvied_tmp_count_games_played = 0
          var archvied_tmp_count_games_played = 0

          for (var i = 0; i < getCount_archived_attendees.length; i++) {
            if (getCount_archived_attendees[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME) {
              great_archvied_tmp_count_games_played++
            }
            if (
              getCount_archived_attendees[i].total_count > CUT_OFF_FOR_ATTENDEES_FOR_GAME &&
              getCount_archived_attendees[i].total_count <= CUT_OFF_FOR_ATTENDEES_FOR_GREAT_GAME
            ) {
              archvied_tmp_count_games_played++
            }
          }
          if (great_tmp_count_games_played + great_archvied_tmp_count_games_played != 0) {
            great_value_to_be_updated = great_tmp_count_games_played + great_archvied_tmp_count_games_played
          }
          if (tmp_count_games_played + archvied_tmp_count_games_played != 0) {
            value_to_be_updated = tmp_count_games_played + archvied_tmp_count_games_played
          }

          break
        case 'total_number_of_likes':
          const getCount_total_number_of_likes_posts = await Database.from('likes')
            .select('likes.id')
            .innerJoin('posts', 'posts.id', 'likes.post_id')
            .where('posts.user_id', '=', my_user_id)
            .whereNot('likes.user_id', '=', my_user_id)
            .count('likes.id as total_count')
          const getCount_total_number_of_likes_comments = await Database.from('likes')
            .select('likes.id')
            .innerJoin('comments', 'comments.id', 'likes.comment_id')
            .where('comments.user_id', '=', my_user_id)
            .whereNot('likes.user_id', '=', my_user_id)
            .count('likes.id as total_count')
          const getCount_total_number_of_likes_replies = await Database.from('likes')
            .select('likes.id')
            .innerJoin('replies', 'replies.id', 'likes.reply_id')
            .where('replies.user_id', '=', my_user_id)
            .whereNot('likes.user_id', '=', my_user_id)
            .count('likes.id as total_count')

          if (getCount_total_number_of_likes_posts.length != 0) {
            value_to_be_updated = value_to_be_updated + getCount_total_number_of_likes_posts[0].total_count
          }
          if (getCount_total_number_of_likes_comments.length != 0) {
            value_to_be_updated = value_to_be_updated + getCount_total_number_of_likes_comments[0].total_count
          }
          if (getCount_total_number_of_likes_replies.length != 0) {
            value_to_be_updated = value_to_be_updated + getCount_total_number_of_likes_replies[0].total_count
          }
          break
        case 'total_number_of_commendations':
          const getCount_total_number_of_commendations = await Database.from('commendations')
            .where({ user_id: my_user_id })
            .count('id as total_count')

          if (getCount_total_number_of_commendations.length != 0) {
            value_to_be_updated = getCount_total_number_of_commendations[0].total_count
          }
          break

        default:
      }
      if (criteria == 'total_number_of_games_played' || criteria == 'total_number_of_great_games_played') {
        this.process_update(my_user_id, 'total_number_of_games_played', value_to_be_updated)
        this.process_update(my_user_id, 'total_number_of_great_games_played', great_value_to_be_updated)
      } else if (criteria == 'total_number_of_games_hosted' || criteria == 'total_number_of_great_games_hosted') {
        this.process_update(my_user_id, 'total_number_of_games_hosted', value_to_be_updated)
        this.process_update(my_user_id, 'total_number_of_great_games_hosted', great_value_to_be_updated)
      } else {
        this.process_update(my_user_id, criteria, value_to_be_updated)
      }

      return 'Saved item'
    } catch (error) {
      console.log(error)
    }
  }

  async process_update(my_user_id, criteria, value_to_be_updated) {
    const getmyStats = await Database.from('user_stat_transactions')
      .innerJoin('user_stats', 'user_stats.id', 'user_stat_transactions.user_stat_id')
      .where({ user_id: my_user_id, criteria: criteria })
      .first()

    const getdetails = await Database.from('user_stats')
      .where({ criteria: criteria })
      .first()

    if (getdetails == undefined) {
      return
    }

    if (getmyStats == undefined) {
      const newStat = await UserStatTransaction.create({
        user_id: my_user_id,
        user_stat_id: getdetails.id,
        values: value_to_be_updated,
        last_month_values: '0',
      })
    } else {
      const date1 = new Date(getmyStats.last_month_updated_at)
      var date2 = Date.now()

      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays >= 30) {
        const updated_stats = await UserStatTransaction.query()
          .where({ user_id: my_user_id, user_stat_id: getdetails.id })
          .update({
            values: value_to_be_updated,
            last_month_values: getmyStats.values,
            last_month_updated_at: mysql_friendly_date,
          })
      } else {
        const updated_stats = await UserStatTransaction.query()
          .where({ user_id: my_user_id, user_stat_id: getdetails.id })
          .update({
            values: value_to_be_updated,
          })
      }
    }
  }
}

module.exports = UserStatTransactionController
