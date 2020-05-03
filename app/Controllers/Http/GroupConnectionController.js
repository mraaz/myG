'use strict'
const GroupConnection = use('App/Models/GroupConnection')

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
}

module.exports = GroupConnectionController
