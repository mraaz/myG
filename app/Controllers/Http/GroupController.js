'use strict'

const Group = use("App/Models/Group")
const Database = use('Database')

class GroupController {

  async store({auth, request, response}){
    if(auth.user){
      try{
        const newGroup = await Group.create({
          user_id: auth.user.id,
          name: request.input('name'),
          group_img: request.input('group_img'),
          type: request.input('type'),
          all_accept: request.input('all_accept')
        })
        return newGroup
      }
      catch(error){
        console.log(error);
      }
    }
  }

  async show_one_name({auth, request, response}){
    try{
      const getOne = await Database.from('groups').where({name: request.params.name}).count('* as no_of_names')

      return {
        getOne
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async groupSearchResults({auth, request, response}){
    try{
      const groupSearchResults = await Group.query().where('name', 'like', '%' + request.params.str + '%').whereNot('type', 3).select('name', 'group_img', 'id', 'type' ).fetch()

      return {
        groupSearchResults
      }

    } catch(error){
      console.log(error)
    }
  }

  async myshow({auth, request, response}){
    try{
      const myGroups = await Database.from('groups').where({user_id: auth.user.id})

      return {
        myGroups
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async show({auth, request, response}){
    try{
      const group = await Database.from('groups').where({id: request.params.id})

      return {
        group
      }
    }
    catch(error){
      console.log(error)
    }
  }

  async update_img({auth, request, response}){
    let current_user_permission = -1

    try{
      const permission_query_current_user = await Database.from('usergroups').where({user_id: auth.user.id, group_id: request.input('group_id')})
      if(permission_query_current_user.length > 0){
        current_user_permission = permission_query_current_user[0].permission_level
      }else {
        const owner_query = await Database.from('groups').where({user_id: auth.user.id, id: request.input('group_id')})
        if(owner_query.length > 0){
          current_user_permission = 0
        }
      }

      if(current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1){
        return
      }

      const update_img = await Group.query().where({id: request.input('group_id')}).update({group_img: request.input('group_img') })
      return 'Saved successfully'

    } catch(error){
      console.log(update_img)
    }
  }

  async update_all_accept({auth, request, response}){
    let current_user_permission = -1

    try{
      const permission_query_current_user = await Database.from('usergroups').where({user_id: auth.user.id, group_id: request.input('group_id')})
      if(permission_query_current_user.length > 0){
        current_user_permission = permission_query_current_user[0].permission_level
      }else {
        const owner_query = await Database.from('groups').where({user_id: auth.user.id, id: request.input('group_id')})
        if(owner_query.length > 0){
          current_user_permission = 0
        }
      }

      if(current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1){
        return
      }

      const update_all_accept = await Group.query().where({id: request.input('group_id')}).update({all_accept: request.input('all_accept') })
      return 'Saved successfully'

    } catch(error){
      console.log(update_all_accept)
    }
  }

  async update_type({auth, request, response}){
    let current_user_permission = -1

    try{
      const permission_query_current_user = await Database.from('usergroups').where({user_id: auth.user.id, group_id: request.params.id})
      if(permission_query_current_user.length > 0){
        current_user_permission = permission_query_current_user[0].permission_level
      }else {
        const owner_query = await Database.from('groups').where({user_id: auth.user.id, id: request.params.id})
        if(owner_query.length > 0){
          current_user_permission = 0
        }
      }

      if(current_user_permission == 3 || current_user_permission == 42 || current_user_permission == -1){
        return
      }

      const update_group_type = await Group.query().where({id: request.params.id}).update({type: request.params.group_type})
      return 'Saved successfully'

    } catch(error){
      console.log(update_group_type)
    }
  }

}

module.exports = GroupController
