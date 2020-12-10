'use strict'

const Database = use('Database')
const Report = use('App/Models/Report')
const LoggingRepository = require('../../Repositories/Logging')

class ReportController {
  async store({ auth, request, response }) {
    if (auth.user) {
      let type = 0

      if (request.input('post_id') != undefined && request.input('post_id') != '' && request.input('post_id') != null) {
        type = 1
      } else if (request.input('comment_id') != undefined && request.input('comment_id') != '' && request.input('comment_id') != null) {
        type = 2
      } else if (request.input('reply_id') != undefined && request.input('reply_id') != '' && request.input('reply_id') != null) {
        type = 3
      }

      try {
        const newReport = await Report.create({
          user_id: auth.user.id,
          report_description: request.input('report_description'),
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          reply_id: request.input('reply_id'),
          type: type,
        })
        return newReport
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('admins')
          .where({ user_id: auth.user.id })
          .first()

        if (security_check == undefined) {
          return
        }

        const delete_report = await Database.table('reports')
          .where({
            id: request.params.id,
          })
          .delete()

        return 'done'
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async show({ auth, request, response }) {
    try {
      let arr = []

      let allReports = await Database.from('reports')
        .groupBy('reports.type', 'reports.post_id')
        .select('reports.id', 'reports.post_id', 'reports.created_at')
        .orderBy('reports.created_at', 'desc')
        .paginate(request.input('counter'), 10)

      allReports = allReports.data

      for (let i = 0; i < allReports.length; i++) {
        const first_two_users = await Database.from('reports')
          .innerJoin('users', 'users.id', 'reports.user_id')
          .where({ post_id: allReports[i].post_id })
          .select('users.alias')
          .orderBy('reports.created_at', 'desc')
          .limit(2)

        const total_post_count = await Database.from('reports')
          .where({ post_id: allReports[i].post_id })
          .count('* as no_of_my_notis')

        const getAllNotiLike_unreadCount = await Database.from('reports')
          .where({ post_id: allReports[i].post_id, read_status: 0 })
          .count('* as no_of_my_unread')

        if (first_two_users != undefined) {
          if (first_two_users.length == 2) {
            allReports[i].first_user_alias = first_two_users[0].alias
            allReports[i].second_user_alias = first_two_users[1].alias
          } else if (first_two_users.length == 1) {
            allReports[i].first_user_alias = first_two_users[0].alias
            allReports[i].second_user = null
          } else {
            allReports[i].first_user_alias = null
            allReports[i].second_user_alias = null
          }
        } else {
          allReports[i].first_user_alias = null
          allReports[i].second_user_alias = null
        }

        allReports[i].total_post_count = total_post_count[0].no_of_my_notis > 0 ? total_post_count[0].no_of_my_notis : 0
        allReports[i].read_status = getAllNotiLike_unreadCount[0].no_of_my_unread > 0 ? 0 : 1
      }
      return allReports
      singleArr.push(...allReports)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }
}

module.exports = ReportController
