'use strict'

const Sponsor = use('App/Models/Sponsor')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')
const CommonController = use('./CommonController')

class SponsorController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        //if its a group, check to see if this user can add
        if (request.input('group_id') != undefined && request.input('group_id') != null) {
          const commonController = new CommonController()

          let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

          if (current_user_permission != 0 && current_user_permission != 1) {
            return
          }
        }
        const create_Sponsor = Sponsor.create({
          user_id: auth.user.id,
          group_id: request.input('group_id'),
          type: request.input('type'),
          media_url: request.input('media_url'),
          link: request.input('link'),
        })
        return
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
        const byebyebye = await Database.table('sponsors')
          .where({
            id: request.input('id'),
          })
          .delete()

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

  async show({ auth }, group_id, user_id) {
    if (auth.user) {
      try {
        let allSponsors
        if (group_id != undefined && group_id != null) {
          allSponsors = await Database.table('sponsors').where({ group_id: group_id })
        } else if (user_id != undefined && user_id != null) {
          allSponsors = await Database.table('sponsors').where({ user_id: user_id })
        }

        return allSponsors
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

  async update({ auth, request, response }) {
    if (auth.user) {
      if (request.input('group_id') != undefined && request.input('group_id') != null) {
        const commonController = new CommonController()

        let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))
        if (current_user_permission != 0 && current_user_permission != 1) {
          return
        }
      }

      try {
        const update_sponsor = await Sponsor.query()
          .where({ id: request.input('id') })
          .update({ media_url: request.input('media_url'), link: request.input('link') })
        return 'Saved successfully'
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
}

module.exports = SponsorController
