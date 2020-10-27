'use strict'

const Sponsor = use('App/Models/Sponsor')
const Database = use('Database')

const LoggingRepository = require('../../Repositories/Logging')
const CommonController = use('./CommonController')
const ApiController = use('./ApiController')

class SponsorController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        //if its a group, check to see if this user can add and Only allow two sponsors
        if (request.input('group_id') != undefined && request.input('group_id') != null) {
          const commonController = new CommonController()

          let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

          if (current_user_permission != 0 && current_user_permission != 1) {
            return
          }

          const allSponsors = await Database.table('sponsors').where({ group_id: request.input('group_id') })

          if (allSponsors.length == 2) {
            const update_sponsor = await Sponsor.query()
              .where({ id: allSponsors[0].id })
              .update({ media_url: request.input('media_url'), link: request.input('link') })

            let tmpArr = request.input('aws_key_id')

            if (tmpArr != undefined && tmpArr.length > 0) {
              const apiController = new ApiController()
              await apiController.internal_deleteFile({ auth }, '10', allSponsors[0].id)

              for (let i = 0; i < tmpArr.length; i++) {
                const alicia_key = await apiController.update_aws_keys_entry({ auth }, tmpArr[i], '10', create_Sponsor.id)
              }
            }

            return
          }
        }

        const create_Sponsor = await Sponsor.create({
          user_id: auth.user.id,
          group_id: request.input('group_id'),
          type: request.input('type'),
          media_url: request.input('media_url'),
          link: request.input('link'),
        })

        let tmpArr = request.input('aws_key_id')

        if (tmpArr != undefined && tmpArr.length > 0) {
          const apiController = new ApiController()
          for (let i = 0; i < tmpArr.length; i++) {
            const alicia_key = await apiController.update_aws_keys_entry({ auth }, tmpArr[i], '10', create_Sponsor.id)
          }
        }

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
        const apiController = new ApiController()
        await apiController.internal_deleteFile({ auth }, '10', request.params.id)

        const byebyebye = await Database.table('sponsors')
          .where({
            id: request.params.id,
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

      const apiController = new ApiController()
      await apiController.internal_deleteFile({ auth }, '10', request.input('id'), true)

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
