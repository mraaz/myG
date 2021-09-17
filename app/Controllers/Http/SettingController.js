'use strict'

const Database = use('Database')
const Settings = use('App/Models/Setting')
const LoggingRepository = require('../../Repositories/Logging')

const fs = require('fs')

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

  async siteMap({ auth, request, response }) {
    if (auth.user) {
      try {
        console.log('TEST!!')
        const header_1 = "<?xml version='1.0' encoding='UTF-8'?>\n"
        const open_urlSet = '<urlset\n'
        const header_3 = "  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'\n"
        const header_4 = "  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\n"
        const header_5 = "  xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9'\n"
        const header_6 = "  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'>\n"

        const openURL = '    <url>\n'
        const closeURL = '    </url>\n'
        const close_urlSet = '  </urlset>\n'

        const strTmp = 'String of text\n Hello worlds'
        fs.writeFile('/t/sitemap.xml', header_1 + open_urlSet + header_3 + header_4 + header_5 + header_6, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log('The file was saved!')
        })

        fs.appendFile('/t/sitemap.xml', openURL + closeURL + close_urlSet, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log('The file was saved!')
        })
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
