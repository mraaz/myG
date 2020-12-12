'use strict'

const Database = use('Database')
const Reported = use('App/Models/Reported')

const LoggingRepository = require('../../Repositories/Logging')

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

  async update(userId, offenceInfo, type) {
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
      await Reported.query()
        .where('user_id', '=', userId)
        .update({
          first_offense: _reported.first_offence_date,
          second_offense: _reported.second_offence_date,
          third_offense: _reported.third_offence_date,
          first_offence_date: 1,
          second_offence_date: 2,
          third_offence_date: 3,
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
}

module.exports = ReportedController
