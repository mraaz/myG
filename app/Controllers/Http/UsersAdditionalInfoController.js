'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const UsersAdditionalInfo = use('App/Models/UsersAdditionalInfo')

const LoggingRepository = require('../../Repositories/Logging')

class UsersAdditionalInfoController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        await Database.table('users_additional_infos').insert({
          user_id: auth.user.id,
          last_logged_in_ip: request.input('last_logged_in_ip'),
          in_eu: request.input('in_eu'),
          logged_in_country_code: request.input('logged_in_country_code'),
          logged_in_regional: request.input('logged_in_regional'),
        })
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          await UsersAdditionalInfo.query()
            .where('user_id', '=', auth.user.id)
            .update({
              last_logged_in_ip: request.input('last_logged_in_ip'),
              in_eu: request.input('in_eu'),
              logged_in_country_code: request.input('logged_in_country_code'),
              logged_in_regional: request.input('logged_in_regional'),
            })
        } else {
          LoggingRepository.log({
            environment: process.env.NODE_ENV,
            type: 'error',
            source: 'backend',
            context: __filename,
            message: (error && error.message) || error,
          })
          return
        }
      }
      await User.query()
        .where('id', '=', auth.user.id)
        .update({
          has_additional: true,
        })
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = UsersAdditionalInfoController
