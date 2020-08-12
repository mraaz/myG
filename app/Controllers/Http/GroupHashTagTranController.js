'use strict'

const Database = use('Database')
const GroupHashTagTran = use('App/Models/GroupHashTagTran')

class GroupHashTagTranController {
  async store({ auth }, group_id, hash_tag_id) {
    if (auth.user) {
      try {
        const create_arrTags = GroupHashTagTran.create({
          group_id: group_id,
          hash_tag_id: hash_tag_id,
        })
        return
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
        console.log(error)
      }
    }
  }
}

module.exports = GroupHashTagTranController
