'use strict'

const Group = use('App/Models/Group')
const GroupHashTag = use('App/Models/GroupHashTag')
const Database = use('Database')

const UserStatTransactionController = use('./UserStatTransactionController')
const GroupHashTagController = use('./GroupHashTagController')
const GroupHashTagTranController = use('./GroupHashTagTranController')
const ApiController = use('./ApiController')
const GameNameController = use('./GameNameController')
const NotificationController_v2 = use('./NotificationController_v2')
const SponsorController = use('./SponsorController')
const CommonController = use('./CommonController')
const PostController = use('./PostController')

const LoggingRepository = require('../../Repositories/Logging')

const MAX_HASH_TAGS = 4
const MAX_INVITEES = 9

class GroupController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        if (
          request
            .input('name')
            .toUpperCase()
            .includes('MYG OFFICIAL')
        ) {
          return false
        }

        if (
          request.input('name').length > 75 ||
          request.input('name') == undefined ||
          request.input('name') == null ||
          request.input('name').length == 0 ||
          request.input('name').length < 4
        ) {
          return false
        }

        if (/['/.%#$;`\\]/.test(request.input('name'))) {
          return false
        }

        if (request.input('grp_description').length > 250) {
          return false
        }

        //Code copied over from ScheduleGameController
        let gameNameID = null

        if (
          request.input('game_name_box') != undefined &&
          request.input('game_name_box') != null &&
          request.input('game_name_box').length > 0
        ) {
          const getGameName = await Database.from('game_names').where({
            game_name: request.input('game_name_box'),
          })
          const gameface = new GameNameController()

          if (getGameName.length == 0) {
            request.params.game_name = request.input('game_name_box')
            let tmp = await gameface.createGame({ auth }, request.input('game_name_box'))
            if (tmp == false) {
              return
            }
            gameNameID = tmp.id
          } else {
            gameNameID = getGameName[0].id
            gameface.incrementGameCounter({ auth }, request.input('game_names_id'))
          }
          gameNameID = parseInt(gameNameID, 10)
        }

        //End copy of code

        const newGroup = await Group.create({
          game_names_id: gameNameID,
          user_id: auth.user.id,
          name: request.input('name').trim(),
          group_img: request.input('group_img') ? request.input('group_img') : null,
          type: request.input('type'),
          all_accept: request.input('all_accept'),
          grp_description: request.input('grp_description'),
        })

        if (request.input('aws_key_id') != undefined && request.input('aws_key_id') != null) {
          const apiController = new ApiController()
          apiController.update_aws_keys_entry({ auth }, request.input('aws_key_id'), '4', newGroup.id)
        }

        if (request.input('tags') != null && request.input('tags').length > 0) {
          const grp_tags_TRANS_Controller = new GroupHashTagTranController()
          var arrTags = JSON.parse(request.input('tags'))

          //Max of three tags per Group.
          for (var i = 0; i < MAX_HASH_TAGS && i < arrTags.length; i++) {
            if (arrTags[i].group_hash_tag_id == null) {
              if (/['/.%#$;`\\]/.test(arrTags[i].value)) {
                continue
              }
              let grp_tags_Controller = new GroupHashTagController()

              const grp_tag_id = await grp_tags_Controller.store({ auth }, arrTags[i].value)
              await grp_tags_TRANS_Controller.store({ auth }, newGroup.id, grp_tag_id)
            } else {
              await grp_tags_TRANS_Controller.store({ auth }, newGroup.id, arrTags[i].group_hash_tag_id)

              const update_counter = await GroupHashTag.query()
                .where({ id: arrTags[i].group_hash_tag_id })
                .increment('counter', 1)
            }
          }
        }

        if (request.input('co_hosts') != undefined && request.input('co_hosts') != null) {
          var arrCo_hosts = request.input('co_hosts').split(',')

          if (arrCo_hosts != '') {
            const noti = new NotificationController_v2()
            for (var i = 0; i < MAX_INVITEES && i < arrCo_hosts.length; i++) {
              noti.addGenericNoti_({ auth }, newGroup.id, arrCo_hosts[i], 22)
            }
          }
        }

        const userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_communities')

        return newGroup
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

  async getGroupDetails({ auth, request, response }) {
    try {
      let following = false
      const getOne = await Database.from('groups')
        .where({ name: decodeURIComponent(request.params.name) })
        .first()

      if (getOne != undefined) {
        const sponsorController = new SponsorController()
        getOne.sponsors = await sponsorController.show({ auth }, getOne.id, null)

        const allGrpTags = await Database.table('group_hash_tag_trans')
          .innerJoin('group_hash_tags', 'group_hash_tags.id', 'group_hash_tag_trans.group_hash_tag_id')
          .where({ group_id: getOne.id })
          .select('content')

        let tmpArr = []
        for (let i = 0; i < allGrpTags.length; i++) {
          tmpArr.push(allGrpTags[i].content)
        }

        getOne.allGrpTags = tmpArr

        const commonController = new CommonController()

        let current_user_permission = await commonController.get_permission({ auth }, getOne.id)

        getOne.current_user_permission = current_user_permission

        const postController = new PostController()
        const grp_posts = await postController.get_group_posts_internal({ auth }, getOne.id, 1)

        getOne.groupPosts = grp_posts.groupPosts

        const getFollowing = await Database.table('followers')
          .where({ group_id: getOne.id, user_id: auth.user.id })
          .first()

        if (getFollowing != undefined) {
          following = true
        }

        getOne.following = following
      }

      return {
        getOne,
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

  async groupInvites({ auth, request, response }) {
    if (auth.user) {
      if (request.input('invitees') != undefined && request.input('invitees') != null) {
        let arrCo_hosts = request.input('invitees').split(',')

        if (arrCo_hosts != '') {
          const noti = new NotificationController_v2()
          for (var i = 0; i < MAX_INVITEES && i < arrCo_hosts.length; i++) {
            noti.addGenericNoti_({ auth }, request.input('group_id'), arrCo_hosts[i], 22)
          }
        }
      }
    }
  }

  async groupSearchResults({ auth, request, response }) {
    try {
      const all_groups_im_in_but_dont_own = Database.from('usergroups')
        .where('usergroups.user_id', '=', auth.user.id)
        .select('group_id')

      const groupSearchResults = await Database.from('groups')
        .select('name', 'group_img', 'id')
        .where('name', 'like', '%' + decodeURI(request.params.str) + '%')
        .whereIn('id', all_groups_im_in_but_dont_own)
        .orWhere('groups.user_id', '=', auth.user.id)
        .andWhere('name', 'like', '%' + decodeURI(request.params.str) + '%')
        .limit(24)

      return {
        groupSearchResults,
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

  async groupSearchResults_notMygrps({ auth, request, response }) {
    try {
      const all_groups_im_in_ish = Database.from('usergroups')
        .leftJoin('groups', 'groups.id', 'usergroups.group_id')
        .where('usergroups.user_id', '=', auth.user.id)
        .orWhere('groups.user_id', '=', auth.user.id)
        .select('group_id')

      const groupSearchResults_im_not_in = await Database.from('groups')
        .select('name', 'group_img', 'id as group_id', 'type')
        .where('name', 'like', '%' + decodeURI(request.params.str) + '%')
        .whereNot('type', 2)
        .whereNotIn('id', all_groups_im_in_ish)
        .limit(24)

      return {
        groupSearchResults_im_not_in,
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

  async groupSearchResults_Post({ auth, request, response }) {
    try {
      const myGroupSearchResults = await Database.from('groups')
        .leftJoin('usergroups', 'usergroups.group_id', 'groups.id')
        .where('usergroups.user_id', '=', auth.user.id)
        .whereNot('usergroups.permission_level', 42)
        .orWhere('groups.user_id', '=', auth.user.id)
        .select('groups.name', 'groups.group_img', 'groups.id', 'groups.type')
        .andWhere('groups.name', 'like', '%' + decodeURI(request.params.str) + '%')
        .limit(88)

      const groupSearchResults_im_not_in = await Database.from('groups')
        .leftJoin('usergroups', 'usergroups.group_id', 'groups.id')
        .where('usergroups.user_id', '!=', auth.user.id)
        .whereNot('type', 2)
        .orWhere('groups.user_id', '!=', auth.user.id)
        .select('groups.name', 'groups.group_img', 'groups.id', 'groups.type')
        .andWhere('groups.name', 'like', '%' + decodeURI(request.params.str) + '%')
        .limit(18)

      // const myGroupSearchResults = await Database.from('groups')
      //   .where('name', 'like', '%' + decodeURI(request.params.str) + '%')
      //   .select('name', 'group_img', 'id', 'type')
      //   //.whereIn('id', all_groups_im_in)
      //   .limit(88)
      //
      // const groupSearchResults_im_not_in = await Database.from('groups')
      //   .where('name', 'like', '%' + decodeURI(request.params.str) + '%')
      //   .whereNot('type', 2)
      //   .select('name', 'group_img', 'id', 'type')
      //   //.whereNotIn('id', all_groups_im_in_ish)
      //   .limit(18)

      //console.log(myGroupSearchResults, '<<<<myGroupSearchResults')
      return {
        myGroupSearchResults,
        groupSearchResults_im_not_in,
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
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
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
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
          .paginate(request.params.counter, 6)

        myGroups = myGroups.data

        let variable = 6
        switch (myGroups.length) {
          case 6:
            variable = 6
            break
          case 5:
            variable = 7
            break
          case 4:
            variable = 8
            break
          case 3:
            variable = 9
            break
          case 2:
            variable = 10
            break
          case 1:
            variable = 11
            break
          case 0:
            variable = 12
            break
        }

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
          .paginate(request.params.counter, variable)

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

  async show_owner({ auth, request, response }) {
    try {
      const show_owner = await Database.from('groups')
        .innerJoin('users', 'users.id', 'groups.user_id')
        .where('groups.id', '=', request.params.id)

      return {
        show_owner,
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
      const grpInfo = await Database.from('groups').where('groups.id', '=', request.params.id)

      return {
        grpInfo,
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

  async update_img({ auth, request, response }) {
    if (auth.user) {
      const commonController = new CommonController()

      let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

      try {
        if (current_user_permission != 0 && current_user_permission != 1 && current_user_permission != 2) {
          return
        }

        const update_img = await Group.query()
          .where({ id: request.input('group_id') })
          .update({ group_img: request.input('group_img') })
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

  async update_settings({ auth, request, response }) {
    if (auth.user) {
      try {
        const commonController = new CommonController()

        let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

        if (current_user_permission != 0 && current_user_permission != 1 && current_user_permission != 2) {
          return
        }
        const update_group_type = await Group.query()
          .where({ id: request.input('group_id') })
          .update({
            type: request.input('privacy'),
            all_accept: request.input('mApprovals') == 'true' ? 1 : 0,
            grp_description: request.input('description'),
          })

        const group_GroupHashTag_details = await Database.from('group_hash_tag_trans')
          .select('id')
          .where({
            group_id: request.input('group_id'),
          })

        for (let i = 0; i < group_GroupHashTag_details.length; i++) {
          const update_counter = await GroupHashTag.query()
            .where({ id: group_GroupHashTag_details[i] })
            .decrement('counter', 1)
        }

        const delete_like = await Database.table('group_hash_tag_trans')
          .where({
            group_id: request.input('group_id'),
          })
          .delete()

        if (request.input('tags') != null && request.input('tags').length > 0) {
          const grp_tags_TRANS_Controller = new GroupHashTagTranController()
          var arrTags = JSON.parse(request.input('tags'))

          //Max of three tags per Group.
          for (var i = 0; i < MAX_HASH_TAGS && i < arrTags.length; i++) {
            if (arrTags[i].group_hash_tag_id == null) {
              if (/['/.%#$;`\\]/.test(arrTags[i].value)) {
                continue
              }
              let grp_tags_Controller = new GroupHashTagController()

              const grp_tag_id = await grp_tags_Controller.store({ auth }, arrTags[i].value)
              await grp_tags_TRANS_Controller.store({ auth }, request.input('group_id'), grp_tag_id)
            } else {
              await grp_tags_TRANS_Controller.store({ auth }, request.input('group_id'), arrTags[i].group_hash_tag_id)

              const update_counter = await GroupHashTag.query()
                .where({ id: arrTags[i].group_hash_tag_id })
                .increment('counter', 1)
            }
          }
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

  async update_name({ auth, request, response }) {
    if (auth.user) {
      try {
        if (/['/.%#$,;`\\]/.test(request.input('name'))) {
          return false
        }
        const commonController = new CommonController()

        let current_user_permission = await commonController.get_permission({ auth }, request.input('group_id'))

        if (current_user_permission != 0 && current_user_permission != 1) {
          return
        }
        const update_img = await Group.query()
          .where({ id: request.input('group_id') })
          .update({ name: request.input('name').trim() })

        return 'Saved successfully'
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
        const owner_query = await Database.from('groups').where({
          user_id: auth.user.id,
          id: request.input('group_id'),
        })
        if (owner_query.length > 0) {
          const apiController = new ApiController()
          await apiController.internal_deleteFile({ auth }, '4', request.input('group_id'))

          const delete_like = await Database.table('groups')
            .where({
              id: request.input('group_id'),
            })
            .delete()
        }

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

  async groupName({ auth, request, response }) {
    try {
      const groupNameResults = await Database.from('groups')
        .select('id')
        .where('name', '=', decodeURIComponent(request.params.group_name.trim()))
        .first()

      if (groupNameResults == undefined) {
        return false
      } else {
        return true
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

module.exports = GroupController
