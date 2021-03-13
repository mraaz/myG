'use strict'

const Database = use('Database')
const Reported = use('App/Models/Reported')

const LoggingRepository = require('../../Repositories/Logging')
const ElasticsearchRepository = require('../../Repositories/Elasticsearch')

class ReportedController {
  async store(userId, report_description, type) {
    let type_ = ''
    switch (parseInt(type)) {
      case 1:
        type_ = 'post'
        break
      case 2:
        type_ = 'comment'
        break
      case 3:
        type_ = 'reply'
        break
    }

    report_description = report_description + ' reported on a ' + type_ + ' you created'

    try {
      await Reported.create({
        user_id: userId,
        first_offence: report_description,
        first_offence_date: new Date(),
      })
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

  async update(userId, offenceInfo, newOffence, type) {
    let type_ = ''
    switch (parseInt(type)) {
      case 1:
        type_ = 'post'
        break
      case 2:
        type_ = 'comment'
        break
      case 3:
        type_ = 'reply'
        break
    }

    let report_description = newOffence + ' reported on a ' + type_ + ' you created'

    offenceInfo.third_offence = offenceInfo.second_offence
    offenceInfo.third_offence_date = offenceInfo.second_offence_date

    offenceInfo.second_offence = offenceInfo.first_offence
    offenceInfo.second_offence_date = offenceInfo.first_offence_date

    offenceInfo.first_offence = report_description
    offenceInfo.first_offence_date = new Date()

    try {
      await Reported.query()
        .where('user_id', '=', userId)
        .update({
          first_offence: offenceInfo.first_offence,
          second_offence: offenceInfo.second_offence,
          third_offence: offenceInfo.third_offence,
          first_offence_date: offenceInfo.first_offence_date,
          second_offence_date: offenceInfo.second_offence_date,
          third_offence_date: offenceInfo.third_offence_date,
        })
        .increment('counter', 1)
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

  async show({ auth, request, response }) {
    try {
      const check = await this.security_check({ auth })

      if (!check) {
        return
      }

      let allReports_gamers = await Database.from('reported')
        .innerJoin('users', 'users.id', 'reported.user_id')
        .select('users.alias', 'users.profile_img', 'reported.*')
        .orderBy('counter', 'desc')
        .paginate(request.params.counter, 10)

      return allReports_gamers.data
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

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const check = await this.security_check({ auth })

        if (!check) {
          return
        }
        const byebyebye = await Database.table('users')
          .where({
            id: request.params.id,
          })
          .delete()
          await ElasticsearchRepository.removeUser({ id: request.params.id })
        return 'Deleted successfully'
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

  async security_check({ auth }) {
    const security_check = await Database.from('admins')
      .where({ user_id: auth.user.id, permission_level: 1 })
      .first()

    if (security_check == undefined) {
      return false
    } else {
      return true
    }
  }
}

module.exports = ReportedController
