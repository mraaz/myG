'use strict'
const GroupConnection = use('App/Models/GroupConnection')
const Database = use('Database')

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
        console.log(error)
      }
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteRegistration = await Database.table('group_connections')
          .where({
            group_id: request.input('group_id'),
            user_id: auth.user.id,
          })
          .delete()

        return 'Remove entry'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = GroupConnectionController
