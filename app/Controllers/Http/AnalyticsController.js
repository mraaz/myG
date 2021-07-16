'use strict'

const Database = use('Database')
const Analytics = use('App/Models/Analytics')

const LoggingRepository = require('../../Repositories/Logging')

class AnalyticsController {
  //Total number of users
  //Total number from DATE
  //Total number of MAU (Monthly Active Users)
  //Total number of WAU (Weekly Active Users)
  //Total number of DAU (Daily Active Users)
  //Total number of returned users
  //Number of users who are greater lvl 2
  //Number of users who are greater lvl 3
  //Number of users who are greater lvl 4
  //Number of users who are greater lvl 5

  async show({ auth }) {
    try {
      const security_check = await Database.from('admins').where({ user_id: auth.user.id, permission_level: 1 }).first()
      const fromDate = '2021-07-19 00:00:00'
      const today = new Date()
      const curMonth = new Date(new Date().setDate(today.getDate() - 30))
      const curWeek = new Date(new Date().setDate(today.getDate() - 7))
      const curDay = new Date(new Date().setDate(today.getDate() - 1))

      let isAdmin = false
      if (security_check != undefined) {
        isAdmin = true
      }
      if (!isAdmin) return

      const getNumberUsers = await Database.from('users').count('* as no_of_Users')

      const getNumberUsersFromDate = await Database.from('users').where('created_at', '>', fromDate).count('* as no_of_Users')

      const getMAU = await Database.from('users_additional_infos').where('last_logged_in_date', '>', curMonth).count('* as no_of_Users')
      const getWAU = await Database.from('users_additional_infos').where('last_logged_in_date', '>', curWeek).count('* as no_of_Users')
      const getDAU = await Database.from('users_additional_infos').where('last_logged_in_date', '>', curDay).count('* as no_of_Users')

      const getlvl2 = await Database.from('users').where({ level: 2 }).count('* as no_of_Users')

      const getlvl3 = await Database.from('users').where({ level: 3 }).count('* as no_of_Users')

      const getlvl4 = await Database.from('users').where({ level: 4 }).count('* as no_of_Users')

      const getlvl5 = await Database.from('users').where({ level: 5 }).count('* as no_of_Users')

      return {
        getNumberUsers,
        getNumberUsersFromDate,
        fromDate,
        getMAU,
        getWAU,
        getDAU,
        getlvl2,
        getlvl3,
        getlvl4,
        getlvl5
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

module.exports = AnalyticsController
