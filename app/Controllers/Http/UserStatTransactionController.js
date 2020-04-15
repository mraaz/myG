'use strict'

const Database = use('Database')
const UserStatTransaction = use('App/Models/UserStatTransaction')

const GREAT_COMMUNITY_SIZE = 100

class UserStatTransactionController {
  async master_controller({ auth, request, response }) {
    if (auth.user) {
      const getmyStats = await Database.from('user_stat_transactions')
        .innerJoin('user_stats', 'user_stats.id', 'user_stat_transactions.user_stat_id')
        .where({ user_id: auth.user.id })

      return {
        getmyStats,
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async update_total_number_of({ auth, request, response }, criteria) {
    if (auth.user) {
      let getCount, tmp
      try {
        switch (criteria) {
          case 'friends':
            getCount = await Database.from('friends')
              .where({ user_id: auth.user.id })
              .count('id as total_count')
            break
          case 'communities':
            getCount = await Database.from('usergroups')
              .where('usergroups.user_id', '=', auth.user.id)
              .whereNot('usergroups.permission_level', 42)
              .count('id as total_count')
              .union([
                Database.from('groups')
                  .where({
                    user_id: auth.user.id,
                  })
                  .count('id as total_count'),
              ])
            tmp = getCount[0].total_count + getCount[1].total_count
            getCount[0].total_count = tmp
            break
          case 'great_communities':
            getCount = await Database.from('usergroups')
              .select('group_id')
              .count('id as total_count')
              .groupBy('group_id')

            let great_communities_arr = []

            for (var i = 0; i < getCount.length; i++) {
              if (getCount[i].total_count > GREAT_COMMUNITY_SIZE) {
                great_communities_arr.push(getCount[i].group_id)
              }
            }
            getCount = await Database.from('usergroups')
              .whereIn('group_id', great_communities_arr)
              .where({ user_id: auth.user.id })
              .whereNot('permission_level', 42)
              .count('id as total_count')
              .union([
                Database.from('groups')
                  .where({
                    user_id: auth.user.id,
                  })
                  .whereIn('id', great_communities_arr)
                  .count('id as total_count'),
              ])
            tmp = getCount[0].total_count + getCount[1].total_count
            getCount[0].total_count = tmp
            break
          default:
        }
        return
        const getmyStats = await Database.from('user_stat_transactions')
          .innerJoin('user_stats', 'user_stats.id', 'user_stat_transactions.user_stat_id')
          .where({ user_id: auth.user.id, criteria: criteria })
          .first()

        const getdetails = await Database.from('user_stats')
          .where({ criteria: criteria })
          .first()

        if (getdetails == undefined) {
          return
        }

        if (getmyStats == undefined) {
          const newStat = await UserStatTransaction.create({
            user_id: auth.user.id,
            user_stat_id: getdetails.id,
            values: getCount[0].total_count,
            last_month_values: '0',
          })
        } else {
          const date1 = new Date(getmyStats.last_month_updated_at)
          var date2 = Date.now()

          const diffTime = Math.abs(date2 - date1)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays >= 30) {
            var mysql_friendly_date = new Date()
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ')

            const updated_stats = await UserStatTransaction.query()
              .where({ user_id: auth.user.id, user_stat_id: getdetails.id })
              .update({
                values: getCount[0].total_count,
                last_month_values: getmyStats.values,
                last_month_updated_at: mysql_friendly_date,
              })
          } else {
            const updated_stats = await UserStatTransaction.query()
              .where({ user_id: auth.user.id, user_stat_id: getdetails.id })
              .update({
                values: getCount[0].total_count,
              })
          }
        }

        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = UserStatTransactionController
