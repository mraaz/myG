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
        let mySettings = await Database.from('settings').where({
          user_id: auth.user.id
        })
        if (mySettings.length == 0) {
          await Settings.create({
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
        await Settings.query()
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

  async siteMap({ auth }) {
    if (auth.user) {
      const security_check = await Database.from('admins').where({ user_id: auth.user.id, permission_level: 1 }).first()
      let isAdmin = false

      if (security_check != undefined) {
        isAdmin = true
      }
      if (!isAdmin) return

      //Ensure this file doesnt already fs.exists, as this appends
      const filePath = 'c:\\t\\sitemap.xml'

      try {
        const header_1 = "<?xml version='1.0' encoding='UTF-8'?>\n"
        const open_urlSet = '<urlset\n'
        const header_3 = "  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'\n"
        const header_4 = "  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\n"
        const header_5 = "  xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9\n"
        const header_6 = "  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'>\n\n\n"

        const openURL = '  <url>\n'
        const closeURL = '  </url>\n'

        const openLOC = '    <loc>'
        const closeLOC = '</loc>\n'

        const close_urlSet = '\n</urlset>'

        fs.appendFileSync(filePath, header_1 + open_urlSet + header_3 + header_4 + header_5 + header_6)

        const profileUsers = await Database.from('posts')
          .innerJoin('users', 'users.id', 'posts.user_id')
          .select('alias')
          .groupBy('users.id')

        //Hard coded values
        let arrPages = []
        arrPages.push('https://myg.gg/guest')
        arrPages.push('https://myg.gg/find-gamers/search')

        for (let index = 0; index < arrPages.length; index++) {
          fs.appendFileSync(filePath, openURL + openLOC + arrPages[index] + closeLOC + closeURL)
        }

        //User profiles
        for (let index = 0; index < profileUsers.length; index++) {
          const tmpStr = 'https://myG.gg/profile/' + profileUsers[index].alias
          fs.appendFileSync(filePath, openURL + openLOC + tmpStr + closeLOC + closeURL)
        }

        fs.appendFileSync(filePath, close_urlSet)

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
