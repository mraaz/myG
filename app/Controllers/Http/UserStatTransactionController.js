'use strict'

const UserStatTransaction = use('App/Models/UserStatTransaction')
const Database = use('Database')

class UserStatTransactionController {
  async update_total_number_of_friends({ auth, request, response }) {
    if (auth.user) {
      try {
        const showCountallMyFriends = await Database.from('friends')
          .where({ user_id: auth.user.id })
          .count('id as total_friends')

        const getmyStats = await Database.from('user_stat_transactions')
          .innerJoin('user_stats', 'user_stats.id', 'user_stat_transactions.user_stat_id')
          .where({ user_id: auth.user.id, criteria: 'total_number_of_friends' })
          .first()

        const getdetails = await Database.from('user_stats')
          .where({ criteria: 'total_number_of_friends' })
          .first()

        if (getdetails == undefined) {
          return
        }

        if (getmyStats == undefined) {
          const newStat = await UserStatTransaction.create({
            user_id: auth.user.id,
            user_stat_id: getdetails.id,
            values: showCountallMyFriends[0].total_friends,
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
                values: showCountallMyFriends[0].total_friends,
                last_month_values: getmyStats.values,
                last_month_updated_at: mysql_friendly_date,
              })
          } else {
            const updated_stats = await UserStatTransaction.query()
              .where({ user_id: auth.user.id, user_stat_id: getdetails.id })
              .update({
                values: showCountallMyFriends[0].total_friends,
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
