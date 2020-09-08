'use strict'

const Database = use('Database')

class CommonController {
  //current_user_permission:
  //-1: Not a member of this group, 0: Owner, 1: Admin of group, 2: Moderator, 3: User, 42:Pending approval
  async get_permission({ auth }, group_id) {
    let current_user_permission = -1
    try {
      const permission_query_current_user = await Database.from('usergroups').where({
        user_id: auth.user.id,
        group_id: group_id,
      })
      if (permission_query_current_user.length > 0) {
        current_user_permission = permission_query_current_user[0].permission_level
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: group_id,
        })
        if (owner_query.length > 0) {
          current_user_permission = 0
        }
      }
      return current_user_permission
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

module.exports = CommonController
