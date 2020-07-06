'use strict'

const Group = use('App/Models/Group')
const Database = use('Database')
const UserStatTransactionController = use('./UserStatTransactionController')

class GroupController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newGroup = await Group.create({
          user_id: auth.user.id,
          name: request.input('name'),
          group_img: request.input('group_img'),
          type: request.input('type'),
          all_accept: request.input('all_accept'),
          game_names_id: request.input('game_names_id'),
          grp_description: request.input('grp_description'),
        })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_communities')

        return newGroup
      } catch (error) {
        console.log(error)
      }
    }
  }

  async show_one_name({ auth, request, response }) {
    try {
      const getOne = await Database.from('groups')
        .where({ name: request.params.name })
        .count('* as no_of_names')

      return {
        getOne,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async groupSearchResults({ auth, request, response }) {
    try {
      const groupSearchResults = await Database.from('groups')
        .where('name', 'like', '%' + request.params.str + '%')
        .whereNot('type', 3)
        .select('name', 'group_img', 'id', 'type')
        .limit(10)

      return {
        groupSearchResults,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async groupSearchResults_Post({ auth, request, response }) {
    try {
      const all_groups_im_in = Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .orWhere('groups.user_id', '=', auth.user.id)
        .select('group_id')

      const all_groups_im_in_ish = Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .orWhere('groups.user_id', '=', auth.user.id)
        .select('group_id')

      const myGroupSearchResults = await Database.from('groups')
        .where('name', 'like', '%' + request.params.str + '%')
        .select('name', 'group_img', 'id', 'type')
        .whereIn('id', all_groups_im_in)
        .limit(88)

      const groupSearchResults_im_not_in = await Database.from('groups')
        .where('name', 'like', '%' + request.params.str + '%')
        .whereNot('type', 3)
        .select('name', 'group_img', 'id', 'type')
        .whereNotIn('id', all_groups_im_in_ish)
        .limit(18)

      return {
        myGroupSearchResults,
        groupSearchResults_im_not_in,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myshow({ auth, request, response }) {
    try {
      let myGroups = await Database.from('groups')
        .where({
          user_id: auth.user.id,
        })
        .paginate(request.params.counter, 20)

      const total_number_of_my_communities = await Database.from('groups')
        .where({ user_id: auth.user.id })
        .count('id as total_number_of_my_communities')

      myGroups = myGroups.data
      return {
        myGroups,
        total_number_of_my_communities: total_number_of_my_communities,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async all_myGrps({ auth, request, response }) {
    try {
      const subquery = Database.select('id')
        .from('groups')
        .where({ user_id: auth.user.id })

      let groups_im_in = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .orWhereIn('usergroups.group_id', subquery)
        .paginate(request.params.counter, 25)

      return {
        groups_im_in,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async get_my_communities({ auth, request, response }) {
    if (auth.user) {
      try {
        let myGroups = await Database.from('groups')
          .where({
            user_id: auth.user.id,
          })
          .select('id', 'name')
          .paginate(request.params.counter, 20)

        const total_number_of_communities = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('usergroups.user_id', '=', auth.user.id)
          .whereNot('usergroups.permission_level', 42)
          .orWhere('groups.user_id', '=', auth.user.id)
          .count('groups.id as total_number_of_communities')

        myGroups = myGroups.data

        const subquery = Database.select('id')
          .from('groups')
          .where({ user_id: auth.user.id })

        let groups_im_in = await Database.from('usergroups')
          .innerJoin('groups', 'groups.id', 'usergroups.group_id')
          .where('usergroups.user_id', '=', auth.user.id)
          .whereNot('usergroups.permission_level', 42)
          .whereNotIn('usergroups.group_id', subquery)
          .groupBy('usergroups.group_id')
          .select('groups.id', 'groups.name')
          .paginate(request.params.counter, 25)

        groups_im_in = groups_im_in.data
        let all_my_communities = [...myGroups, ...groups_im_in]

        for (var i = 0; i < all_my_communities.length; i++) {
          const myPeeps = await Database.from('usergroups')
            .where({
              group_id: all_my_communities[i].id,
            })
            .count('* as no_of_peeps')

          all_my_communities[i].no_of_peeps = myPeeps[0].no_of_peeps
        }

        return {
          all_my_communities,
          total_number_of_communities: total_number_of_communities,
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async show({ auth, request, response }) {
    try {
      const group = await Database.from('groups').where({
        id: request.params.id,
      })

      return {
        group,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show_owner({ auth, request, response }) {
    try {
      const show_owner = await Database.from('groups')
        .innerJoin('users', 'users.id', 'groups.user_id')
        .where('groups.id', '=', request.params.id)

      return {
        show_owner,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update_img({ auth, request, response }) {
    if (auth.user) {
      let current_user_permission = await this.get_permission({ auth }, request.input('group_id'))

      try {
        if (current_user_permission != 0 && current_user_permission != 1 && current_user_permission != 2) {
          return
        }

        const update_img = await Group.query()
          .where({ id: request.input('group_id') })
          .update({ group_img: request.input('group_img') })
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async update_settings({ auth, request, response }) {
    if (auth.user) {
      try {
        let current_user_permission = await this.get_permission({ auth }, request.input('group_id'))

        if (current_user_permission != 0 && current_user_permission != 1 && current_user_permission != 2) {
          return
        }
        const update_group_type = await Group.query()
          .where({ id: request.input('group_id') })
          .update({ type: request.input('privacy'), all_accept: request.input('mApprovals') })
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async update_name({ auth, request, response }) {
    if (auth.user) {
      try {
        if (/['/.%#$,;`\\]/.test(request.input('name'))) {
          return false
        }
        let current_user_permission = await this.get_permission({ auth }, request.input('group_id'))

        if (current_user_permission != 0 && current_user_permission != 1) {
          return
        }
        const update_img = await Group.query()
          .where({ id: request.input('group_id') })
          .update({ name: request.input('name') })

        return 'Saved successfully'
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
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.input('group_id'),
        })
        if (owner_query.length > 0) {
          const delete_like = await Database.table('groups')
            .where({
              id: request.input('group_id'),
            })
            .delete()
        }

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

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
      console.log(error)
    }
  }
}

module.exports = GroupController
