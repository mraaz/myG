'use strict'
const GroupConnection = use('App/Models/GroupConnection')
const Database = use('Database')
const LoggingRepository = require('../../Repositories/Logging')

class GroupConnectionController {
  //Decided not find duplicates myself and instead let the DB figure it out.
  async store({ auth }, group_id, group_size) {
    if (auth.user) {
      try {
        const newGroupConnection = await GroupConnection.create({
          user_id: auth.user.id,
          group_id: group_id,
          group_size: group_size,
        })
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
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
        const deleteRegistration = await Database.table('group_connections')
          .where({
            group_id: request.params.group_id,
            user_id: auth.user.id,
          })
          .delete()

        return 'Remove entry'
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
}

module.exports = GroupConnectionController
