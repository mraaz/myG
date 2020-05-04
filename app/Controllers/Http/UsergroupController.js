'use strict'

const Usergroup = use('App/Models/Usergroup')
const Group = use('App/Models/Group')
const Database = use('Database')
const NotificationController = use('./NotificationController')
const UserStatTransactionController = use('./UserStatTransactionController')
const GroupConnectionController = use('./GroupConnectionController')

class UsergroupController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newaddition = await Usergroup.create({
          group_id: request.input('group_id'),
          user_id: auth.user.id,
          permission_level: 42,
        })

        let myGroupConnectionController = new GroupConnectionController()
        myGroupConnectionController.destroy({ auth, request, response })

        return newaddition
      } catch (error) {
        console.log(error)
      }
    }
  }

  async myshow({ auth, request, response }) {
    try {
      const subquery = Database.select('id')
        .from('groups')
        .where({ user_id: auth.user.id })

      const groups_im_in = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .whereNotIn('usergroups.group_id', subquery)
        .paginate(request.params.counter, 50)

      const total_number_of_communities = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .whereNotIn('usergroups.group_id', subquery)
        .count('usergroups.id as total_number_of_communities')

      //const myPosts = await Database.from('posts').innerJoin('users', 'users.id', 'posts.user_id').where('posts.user_id', '=', auth.user.id).andWhere('posts.created_at', '>=', request.params.myDate).select('*', 'posts.id', 'posts.created_at','posts.updated_at').orderBy('posts.created_at', 'desc')
      return {
        groups_im_in,
        total_number_of_communities: total_number_of_communities,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async show({ auth, request, response }) {
    try {
      const all_my_groups = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', request.params.id)

      return {
        all_my_groups,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async mygroup_details({ auth, request, response }) {
    try {
      const mygroup_details = await Database.from('usergroups').where({
        user_id: auth.user.id,
        group_id: request.params.id,
      })

      return {
        mygroup_details,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteRegistration = await Database.table('usergroups')
          .where({
            group_id: request.params.id,
            user_id: auth.user.id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_communities')

        return 'Remove entry'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async get_all_my_group_approvals({ auth, request, response }) {
    try {
      //const subquery = Database.select('group_id').from('usergroups').where({user_id: auth.user.id, permission_level: 1}).orWhere({user_id: auth.user.id, permission_level: 2})
      //const admin_group_permissions = await Database.from('usergroups').innerJoin('users', 'users.id', 'usergroups.user_id').whereIn('usergroups.group_id', subquery).where({permission_level: 42})
      let admin_group_permissions = ''
      let group_query = ''
      let access_granted = false

      const permissions_query = await Database.from('usergroups')
        .where({
          user_id: auth.user.id,
          permission_level: 1,
          group_id: request.params.id,
        })
        .orWhere({
          user_id: auth.user.id,
          permission_level: 2,
          group_id: request.params.id,
        })
      if (permissions_query.length > 0) {
        access_granted = true
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          access_granted = true
        } else {
          group_query = await Database.from('groups').where({
            id: request.params.id,
          })
          if (group_query[0].all_accept) {
            const user_query = await Database.from('usergroups').where({
              user_id: auth.user.id,
              group_id: request.params.id,
              permission_level: 3,
            })
            if (user_query.length > 0) {
              access_granted = true
            }
          }
        }
      }

      if (access_granted) {
        admin_group_permissions = await Database.from('usergroups')
          .innerJoin('users', 'users.id', 'usergroups.user_id')
          .where({ group_id: request.params.id, permission_level: 42 })
          .select('*', 'usergroups.id')
      }
      if (group_query.length == 0) {
        group_query = await Database.from('groups').where({
          id: request.params.id,
        })
      }

      return {
        admin_group_permissions,
        group_query: group_query[0].name,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async set_group_approval({ auth, request, response }) {
    try {
      let access_granted = false

      const permissions_query = await Database.from('usergroups')
        .where({
          user_id: auth.user.id,
          permission_level: 1,
          group_id: request.params.id,
        })
        .orWhere({
          user_id: auth.user.id,
          permission_level: 2,
          group_id: request.params.id,
        })
      if (permissions_query.length > 0) {
        access_granted = true
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          access_granted = true
        } else {
          const group_query = await Database.from('groups').where({
            id: request.params.id,
          })
          if (group_query[0].all_accept) {
            const user_query = await Database.from('usergroups').where({
              user_id: auth.user.id,
              group_id: request.params.id,
              permission_level: 3,
            })
            if (user_query.length > 0) {
              access_granted = true
            }
          }
        }
      }

      if (access_granted) {
        const updated_permission = await Usergroup.query()
          .where({ id: request.params.usergrp_id })
          .update({ permission_level: 3 })

        //get user id for other_user_id
        //update noti with 17 as type
        const query_for_user = await Database.from('usergroups')
          .innerJoin('users', 'users.id', 'usergroups.user_id')
          .where('usergroups.id', '=', request.params.usergrp_id)
          .select('users.id')

        let noti = new NotificationController()
        request.params.group_id = request.params.id
        request.params.other_user_id = query_for_user[0].id
        noti.add_approved_group_attendee({ auth, request, response })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(query_for_user[0].id, 'total_number_of_communities')

        return 'Saved successfully'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async remove_group_approval({ auth, request, response }) {
    try {
      let access_granted = false

      const permissions_query = await Database.from('usergroups')
        .where({
          user_id: auth.user.id,
          permission_level: 1,
          group_id: request.params.id,
        })
        .orWhere({
          user_id: auth.user.id,
          permission_level: 2,
          group_id: request.params.id,
        })
      if (permissions_query.length > 0) {
        access_granted = true
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          access_granted = true
        } else {
          const group_query = await Database.from('groups').where({
            id: request.params.id,
          })
          if (group_query[0].all_accept) {
            const user_query = await Database.from('usergroups').where({
              user_id: auth.user.id,
              group_id: request.params.id,
              permission_level: 3,
            })
            if (user_query.length > 0) {
              access_granted = true
            }
          }
        }
      }

      if (access_granted) {
        const deleteRegistration = await Database.table('usergroups')
          .where({
            id: request.params.usergrp_id,
          })
          .delete()
        return 'Removed successfully'
      }
    } catch (error) {
      console.log(error)
    }
  }

  // permission_level of current user (3,42 return)
  // permission_level of user to be deteleted (0 return)
  // permission_level is 2  and delete_user is 1 return
  async delete_member({ auth, request, response }) {
    try {
      let current_user_permission = -1
      let user_to_be_deleted_permission = -1

      const permission_query_current_user = await Database.from('usergroups').where({ user_id: auth.user.id, group_id: request.params.id })
      if (permission_query_current_user.length > 0) {
        current_user_permission = permission_query_current_user[0].permission_level
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          current_user_permission = 0
        }
      }

      if (current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1) {
        return
      }

      const permission_query_to_be_deleted_user = await Database.from('usergroups').where({ id: request.params.usergrp_id })
      if (permission_query_to_be_deleted_user.length > 0) {
        user_to_be_deleted_permission = permission_query_to_be_deleted_user[0].permission_level
      } else {
        return
      }

      if (current_user_permission == 2) {
        if (user_to_be_deleted_permission == 1) {
          return
        }
      }

      const deleteMember = await Database.table('usergroups')
        .where({
          id: request.params.usergrp_id,
        })
        .delete()

      let noti = new NotificationController()
      request.params.group_id = request.params.id
      request.params.other_user_id = permission_query_to_be_deleted_user[0].user_id

      noti.kicked_from_group({ auth, request, response })

      let userStatController = new UserStatTransactionController()
      userStatController.update_total_number_of(permission_query_to_be_deleted_user[0].user_id, 'total_number_of_communities')

      return 'Removed successfully'
    } catch (error) {
      console.log(error)
    }
  }

  // permission_level of current user (3,42 return)
  // permission_level of user to be promoted (1,0 return)
  // permission_level is 2  and promoted_user is 2 return
  async promote_member({ auth, request, response }) {
    try {
      let current_user_permission = -1
      let user_to_be_promoted_permission = -1

      const permission_query_current_user = await Database.from('usergroups').where({ user_id: auth.user.id, group_id: request.params.id })
      if (permission_query_current_user.length > 0) {
        current_user_permission = permission_query_current_user[0].permission_level
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          current_user_permission = 0
        }
      }

      if (current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1) {
        return
      }

      const permission_query_to_be_promoted_user = await Database.from('usergroups').where({ id: request.params.usergrp_id })
      if (permission_query_to_be_promoted_user.length > 0) {
        if (permission_query_to_be_promoted_user[0].permission_level == 1) {
          return
        }
        user_to_be_promoted_permission = permission_query_to_be_promoted_user[0].permission_level
      } else {
        return
      }

      if (current_user_permission == 2) {
        if (user_to_be_promoted_permission == 2) {
          return
        }
      }

      const updated_permission = await Usergroup.query()
        .where({ id: request.params.usergrp_id })
        .update({ permission_level: user_to_be_promoted_permission - 1 })
      return 'updated successfully'
    } catch (error) {
      console.log(error)
    }
  }

  // permission_level of current user (3,42 return)
  // permission_level of user to be demoted (3,0 return)
  // permission_level is 2  and promoted_user is 2 return
  async demote_member({ auth, request, response }) {
    try {
      let current_user_permission = -1
      let user_to_be_demoted_permission = -1

      const permission_query_current_user = await Database.from('usergroups').where({ user_id: auth.user.id, group_id: request.params.id })
      if (permission_query_current_user.length > 0) {
        current_user_permission = permission_query_current_user[0].permission_level
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.id,
        })
        if (owner_query.length > 0) {
          current_user_permission = 0
        }
      }

      if (current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1) {
        return
      }

      const permission_query_to_be_demoted_user = await Database.from('usergroups').where({ id: request.params.usergrp_id })
      if (permission_query_to_be_demoted_user.length > 0) {
        if (permission_query_to_be_demoted_user[0].permission_level == 3) {
          return
        }
        user_to_be_demoted_permission = permission_query_to_be_demoted_user[0].permission_level
      } else {
        return
      }

      if (current_user_permission == 2) {
        if (user_to_be_demoted_permission == 2) {
          return
        }
      }

      const updated_permission = await Usergroup.query()
        .where({ id: request.params.usergrp_id })
        .update({ permission_level: user_to_be_demoted_permission + 1 })
      return 'updated successfully'
    } catch (error) {
      console.log(error)
    }
  }

  async member_lists({ auth, request, response }) {
    try {
      const all_group_members = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .innerJoin('users', 'users.id', 'usergroups.user_id')
        .where('usergroups.group_id', '=', request.params.id)
        .whereNot('usergroups.permission_level', 42)
        .select('*', 'usergroups.user_id as usergroups_user_id', 'groups.user_id as groups_user_id', 'usergroups.id')

      return {
        all_group_members,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async current_member({ auth, request, response }) {
    try {
      const current_member = await Database.from('usergroups')
        .where({ group_id: request.params.id, user_id: auth.user.id })
        .select('permission_level')

      return {
        current_member,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UsergroupController
