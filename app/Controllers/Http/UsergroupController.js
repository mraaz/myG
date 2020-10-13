'use strict'

const Usergroup = use('App/Models/Usergroup')
const Group = use('App/Models/Group')
const Database = use('Database')
const NotificationController = use('./NotificationController')
const NotificationController_v2 = use('./NotificationController_v2')
const CommonController = use('./CommonController')

const UserStatTransactionController = use('./UserStatTransactionController')
const GroupConnectionController = use('./GroupConnectionController')
const LoggingRepository = require('../../Repositories/Logging')

class UsergroupController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newaddition = await Usergroup.create({
          group_id: request.input('group_id'),
          user_id: auth.user.id,
          permission_level: 42,
        })

        const myGroupConnectionController = new GroupConnectionController()
        myGroupConnectionController.destroy({ auth }, request.input('group_id'))

        const noti = new NotificationController_v2()
        noti.notify_owner_new_grp_request({ auth }, request.input('group_id'))
        noti.new_grp_request({ auth }, request.input('group_id'))

        return 'Saved'
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

  async myshow({ auth, request, response }) {
    try {
      const subquery = Database.select('id')
        .from('groups')
        .where({ user_id: auth.user.id })

      let groups_im_in = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .whereNotIn('usergroups.group_id', subquery)
        .paginate(request.params.counter, 25)

      const total_number_of_communities = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .whereNotIn('usergroups.group_id', subquery)
        .count('usergroups.id as total_number_of_communities')

      groups_im_in = groups_im_in.data
      return {
        groups_im_in,
        total_number_of_communities: total_number_of_communities,
      }
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

  async show({ auth, request, response }) {
    try {
      const all_my_groups = await Database.from('usergroups')
        .innerJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', request.params.id)

      return {
        all_my_groups,
      }
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

  async mygroup_details({ auth, request, response }) {
    try {
      const mygroup_details = await Database.from('usergroups').where({
        user_id: auth.user.id,
        group_id: request.params.group_id,
      })

      return {
        mygroup_details,
      }
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
          group_id: request.params.group_id,
        })
        .orWhere({
          user_id: auth.user.id,
          permission_level: 2,
          group_id: request.params.group_id,
        })
      if (permissions_query.length > 0) {
        access_granted = true
      } else {
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.params.group_id,
        })
        if (owner_query.length > 0) {
          access_granted = true
        } else {
          group_query = await Database.from('groups').where({
            id: request.params.group_id,
          })
          if (group_query[0].all_accept) {
            const user_query = await Database.from('usergroups').where({
              user_id: auth.user.id,
              group_id: request.params.group_id,
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
          .where({ group_id: request.params.group_id, permission_level: 42 })
          .select('*', 'usergroups.id')
      }
      if (group_query.length == 0) {
        group_query = await Database.from('groups').where({
          id: request.params.group_id,
        })
      }

      return {
        admin_group_permissions,
        group_query: group_query[0].name,
      }
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

  async set_group_approval({ auth, request, response }) {
    if (auth.user) {
      try {
        let access_granted = false

        const permissions_query = await Database.from('usergroups')
          .where({
            user_id: auth.user.id,
            permission_level: 1,
            group_id: request.params.grp_id,
          })
          .orWhere({
            user_id: auth.user.id,
            permission_level: 2,
            group_id: request.params.grp_id,
          })
        if (permissions_query.length > 0) {
          access_granted = true
        } else {
          const owner_query = await Database.from('groups').where({
            user_id: auth.user.id,
            id: request.params.grp_id,
          })
          if (owner_query.length > 0) {
            access_granted = true
          } else {
            const group_query = await Database.from('groups').where({
              id: request.params.grp_id,
            })
            if (group_query[0].all_accept) {
              const user_query = await Database.from('usergroups').where({
                user_id: auth.user.id,
                group_id: request.params.grp_id,
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
            .where({ group_id: request.params.grp_id, user_id: request.params.user_id })
            .update({ permission_level: 3 })

          const noti = new NotificationController_v2()
          noti.add_approved_group_attendee({ auth }, request.params.grp_id, request.params.user_id)

          const userStatController = new UserStatTransactionController()
          userStatController.update_total_number_of(request.params.user_id, 'total_number_of_communities')

          //delete this notification
          auth.user.id = request.params.user_id
          noti.delete_group_invites({ auth }, request.params.grp_id)

          return 'Saved successfully'
        } else {
          const delete_this_noti = await Database.table('notifications')
            .where({
              other_user_id: auth.user.id,
              group_id: request.params.grp_id,
              activity_type: 12,
            })
            .delete()
        }
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

  async remove_group_approval({ auth, request, response }) {
    if (auth.user) {
      try {
        let access_granted = false

        const permissions_query = await Database.from('usergroups')
          .where({
            user_id: auth.user.id,
            permission_level: 1,
            group_id: request.params.group_id,
          })
          .orWhere({
            user_id: auth.user.id,
            permission_level: 2,
            group_id: request.params.group_id,
          })
        if (permissions_query.length > 0) {
          access_granted = true
        } else {
          const owner_query = await Database.from('groups').where({
            user_id: auth.user.id,
            id: request.params.group_id,
          })
          if (owner_query.length > 0) {
            access_granted = true
          } else {
            const group_query = await Database.from('groups').where({
              id: request.params.group_id,
            })
            if (group_query[0].all_accept) {
              const user_query = await Database.from('usergroups').where({
                user_id: auth.user.id,
                group_id: request.params.group_id,
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

  // permission_level of current user (3,42 return)
  // permission_level of user to be deteleted (0 return)
  // permission_level is 2  and delete_user is 1 return
  async delete_member({ auth, request, response }) {
    if (auth.user) {
      try {
        let current_user_permission = -1
        let user_to_be_deleted_permission = -1

        const permission_query_current_user = await Database.from('usergroups').where({
          user_id: auth.user.id,
          group_id: request.params.group_id,
        })
        if (permission_query_current_user.length > 0) {
          current_user_permission = permission_query_current_user[0].permission_level
        } else {
          const owner_query = await Database.from('groups').where({
            user_id: auth.user.id,
            id: request.params.group_id,
          })
          if (owner_query.length > 0) {
            current_user_permission = 0
          }
        }

        if (current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1) {
          return false
        }

        const permission_query_to_be_deleted_user = await Database.from('usergroups').where({ id: request.params.usergrp_id })

        if (permission_query_to_be_deleted_user.length > 0) {
          user_to_be_deleted_permission = permission_query_to_be_deleted_user[0].permission_level
        } else {
          return false
        }

        if (current_user_permission == 2) {
          if (user_to_be_deleted_permission == 1) {
            return false
          }
        }

        const deleteMember = await Database.table('usergroups')
          .where({
            id: request.params.usergrp_id,
          })
          .delete()

        let noti = new NotificationController()
        request.params.group_id = request.params.group_id
        request.params.other_user_id = permission_query_to_be_deleted_user[0].user_id

        noti.kicked_from_group({ auth, request, response })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(permission_query_to_be_deleted_user[0].user_id, 'total_number_of_communities')

        return true
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
        const deleteMember = await Database.table('usergroups')
          .where({
            user_id: auth.user.id,
            group_id: request.params.group_id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_communities')

        const noti = new NotificationController_v2()
        noti.delete_group_invites({ auth }, request.params.group_id)

        return true
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

  // permission_level of current user (3,42 return)
  // permission_level of user to be promoted (1,0 return)
  // permission_level is 2  and promoted_user is 2 return
  async promote_member_cycle({ auth, request, response }) {
    if (auth.user) {
      try {
        let current_user_permission = -1
        let user_to_be_promoted_permission = -1

        const commonController = new CommonController()

        current_user_permission = await commonController.get_permission({ auth }, request.params.group_id)

        if (current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1) {
          return false
        }

        const noti = new NotificationController_v2()

        const permission_query_to_be_promoted_user = await Database.from('usergroups').where({ id: request.params.usergrp_id })

        if (permission_query_to_be_promoted_user.length > 0) {
          if (permission_query_to_be_promoted_user[0].permission_level == 42) {
            return false
          }

          if (permission_query_to_be_promoted_user[0].permission_level == 1) {
            //I'm the grp owner, I can demote Admins
            if (current_user_permission == 0) {
              const updated_permission = await Usergroup.query()
                .where({ id: request.params.usergrp_id })
                .update({ permission_level: 3, permission_level_updated_by: auth.user.id })

              noti.addGenericNoti_({ auth }, request.params.group_id, permission_query_to_be_promoted_user[0].user_id, 24)

              return 3
              //I'm a admin, I can only demote Admins if "I" promoted them in the last 5 mins
            } else if (current_user_permission == 1) {
              let timeDif = (Date.now() - new Date(permission_query_to_be_promoted_user[0].updated_at)) / 1000
              timeDif /= 60

              timeDif = Math.abs(Math.round(timeDif))

              if (timeDif < 5 && permission_query_to_be_promoted_user[0].permission_level_updated_by == auth.user.id) {
                const updated_permission = await Usergroup.query()
                  .where({ id: request.params.usergrp_id })
                  .update({ permission_level: 3, permission_level_updated_by: auth.user.id })

                noti.addGenericNoti_({ auth }, request.params.group_id, permission_query_to_be_promoted_user[0].user_id, 24)

                return 3
              }
            }
            //Only grp Owner or Admin who promoted me recently can demote me
            return false
          }
          user_to_be_promoted_permission = permission_query_to_be_promoted_user[0].permission_level
        } else {
          //ID provided doesnt exist
          return false
        }

        if (current_user_permission == 2) {
          if (user_to_be_promoted_permission == 2) {
            let timeDif = (Date.now() - new Date(permission_query_to_be_promoted_user[0].updated_at)) / 1000
            timeDif /= 60

            timeDif = Math.abs(Math.round(timeDif))

            if (timeDif < 5 && permission_query_to_be_promoted_user[0].permission_level_updated_by == auth.user.id) {
              const updated_permission = await Usergroup.query()
                .where({ id: request.params.usergrp_id })
                .update({ permission_level: 3, permission_level_updated_by: auth.user.id })

              return 3
            }
            //We're Moderators we can't go up
            return false
          }
        }

        //Insurance Policy
        if (user_to_be_promoted_permission - 1 < current_user_permission) {
          LoggingRepository.log({
            environment: process.env.NODE_ENV,
            type: 'error',
            source: 'backend',
            context: __filename,
            message: 'Insurance Policy Activated!!! UsergroupController',
          })
          return false
        }

        const updated_permission = await Usergroup.query()
          .where({ id: request.params.usergrp_id })
          .update({ permission_level: user_to_be_promoted_permission - 1, permission_level_updated_by: auth.user.id })

        noti.addGenericNoti_({ auth }, request.params.group_id, permission_query_to_be_promoted_user[0].user_id, 23)

        return user_to_be_promoted_permission - 1
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })

        return false
      }
    }
  }

  async member_lists({ auth, request, response }) {
    try {
      let all_group_members = await Database.from('usergroups')
        .innerJoin('users', 'users.id', 'usergroups.user_id')
        .where('usergroups.group_id', '=', request.input('group_id'))
        .whereNot('usergroups.permission_level', 42)
        .select('usergroups.*', 'usergroups.id', 'users.profile_img', 'users.alias', 'users.level', 'users.profile_bg')
        .paginate(request.input('counter'), 10)

      all_group_members = all_group_members.data

      if (request.input('counter') == 1) {
        const show_owner = await Database.from('groups')
          .innerJoin('users', 'users.id', 'groups.user_id')
          .where('groups.id', '=', request.input('group_id'))
          .select('users.profile_img', 'users.alias', 'users.level', 'users.profile_bg')
          .first()
        show_owner.permission_level = 0
        all_group_members.unshift(show_owner)
      }

      return {
        all_group_members,
      }
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

  async current_member({ auth, request, response }) {
    try {
      const current_member = await Database.from('usergroups')
        .where({ group_id: request.params.group_id, user_id: auth.user.id })
        .select('permission_level')

      return {
        current_member,
      }
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

  //Group Owner will NOT show up in search. It will always be the 1st card on the initial list
  async usergroupSearchResults({ auth, request, response }) {
    try {
      const all_group_members = await Database.from('usergroups')
        .innerJoin('users', 'users.id', 'usergroups.user_id')
        .where('usergroups.group_id', '=', request.input('group_id'))
        .where('users.alias', 'like', '%' + request.input('alias') + '%')
        .whereNot('usergroups.permission_level', 42)
        .select('usergroups.*', 'usergroups.id', 'users.profile_img', 'users.alias', 'users.level', 'users.profile_bg')
        .limit(24)

      return {
        all_group_members,
      }
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

module.exports = UsergroupController
