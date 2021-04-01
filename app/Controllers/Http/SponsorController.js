'use strict'

const Sponsor = use('App/Models/Sponsor')
const Database = use('Database')

const LoggingRepository = require('../../Repositories/Logging')
const CommonController = use('./CommonController')
const ApiController = use('./ApiController')
const NotificationController_v2 = use('./NotificationController_v2')

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

  async show_approval({ auth, request, response }) {
    if (auth.user) {
      try {
        const check = await this.security_check({ auth })

        if (!check) {
          return
        }

        const allSponsors = await Database.table('sponsors')
          .innerJoin('users', 'users.id', 'sponsors.user_id')
          .where({ type: 1 })
          .select('sponsors.*', 'users.alias', 'users.profile_img')
          .paginate(request.params.counter, 10)

        return allSponsors.data
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
          .update({ media_url: request.input('media_url'), link: request.input('link'), type: 1 })

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

  async approval_for_sponsor({ auth, request, response }) {
    if (auth.user) {
      try {
        const check = await this.security_check({ auth })

        if (!check) {
          return
        }

        const update_sponsor = await Sponsor.query()
          .where({ id: request.input('id') })
          .update({ type: parseInt(request.input('approval')) })

        const noti = new NotificationController_v2()

        const thisSponsor = await Database.table('sponsors')
          .where({ id: request.input('id') })
          .first()

        if (thisSponsor == undefined) return

        switch (parseInt(request.input('approval'))) {
          case 0:
            noti.addGenericNoti_({ auth }, thisSponsor.group_id, thisSponsor.user_id, thisSponsor.group_id == null ? 26 : 28)
            break
          case 2:
            noti.addGenericNoti_({ auth }, thisSponsor.group_id, thisSponsor.user_id, thisSponsor.group_id == null ? 25 : 27)
            break
        }

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

module.exports = SponsorController
