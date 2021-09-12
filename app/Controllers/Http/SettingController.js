'use strict'

const Database = use('Database')
const Settings = use('App/Models/Setting')
const LoggingRepository = require('../../Repositories/Logging')

//A new record is created in AuthController when the user is created
class SettingController {
  async show({ auth, request, response }) {
    if (auth.user) {
      try {
        var mySettings = await Database.from('settings').where({
          user_id: auth.user.id
        })
        if (mySettings.length == 0) {
          var newUserSettings = await Settings.create({
            user_id: auth.user.id
          })
          mySettings = await Database.from('settings').where({
            user_id: auth.user.id
          })
        }
        return {
          mySettings
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

  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const saveSettings = await Settings.query()
          .where('user_id', '=', auth.user.id)
          .update({ email_notification: request.input('email_notification') })
        return 'Saved successfully'
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
}

module.exports = SettingController
