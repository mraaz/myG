'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const UserChat = use('App/Models/UserChat')
const { broadcast } = require('../../Common/socket')
const AwsKeyController = use('./AwsKeyController')

class UserController {
  async profile({ auth, request, response }) {
    try {
      const user = await User.query()
        .where('id', '=', request.params.id)
        .fetch()
      const friend = await Database.from('friends').where({
        user_id: auth.user.id,
        friend_id: request.params.id,
      })

      return {
        user: user.toJSON(),

        friend: friend === undefined || friend.length == 0 ? false : true,
      }
    } catch (error) {
      console.log(error)
    }
  }
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const saveUser = await User.query()
          .where('id', '=', auth.user.id)
          .update({
            first_name: request.input('first_name_box'),
            last_name: request.input('last_name_box'),
            slogan: request.input('slogan'),
            bio: request.input('bio'),
            country: request.input('country'),
            region: request.input('region'),
            contact_info: request.input('contact_info'),
            relationship_status: request.input('relationship_status'),
          })
        return 'Saved successfully'
      } catch (error) {
        console.log(saveUser)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
  async follow({ auth, request, response }) {
    if (auth.user) {
      try {
        const followedUser = await Database.table('friends').insert({
          user_id: auth.user.id,
          friend_id: request.params.id,
        })
        //const vicevesa = await Database.table('friends').insert({user_id:request.params.id , friend_id: auth.user.id})

        console.log(followedUser)
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
  async unfriend({ auth, request, response }) {
    if (auth.user) {
      try {
        const unfriendUser = await Database.table('friends')
          .where({
            user_id: auth.user.id,
            friend_id: request.params.id,
          })
          .delete()

        const unfriendUserViceVersa = await Database.table('friends')
          .where({
            user_id: request.params.id,
            friend_id: auth.user.id,
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
  async playerSearchResults({ auth, request, response }) {
    try {
      const playerSearchResults = await User.query()
        .where('first_name', 'like', '%' + request.params.str + '%')
        .orWhere('last_name', 'like', '%' + request.params.str + '%')
        .select('first_name as first', 'last_name as last', 'profile_img', 'id')
        .fetch()

      return {
        playerSearchResults,
      }
    } catch (error) {
      console.log(error)
    }
  }
  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const byebyebye = await Database.table('users')
          .where({
            id: auth.user.id,
          })
          .delete()

        return 'Deleted successfully'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async changeProfile({ auth, request, response }) {
    if (auth.user) {
      try {
        let update_key = new AwsKeyController()
        request.params.type = 1
        update_key.addUserKey({ auth, request, response })

        const saveUser = await User.query()
          .where('id', '=', auth.user.id)
          .update({ profile_img: request.input('profile_img') })

        return response.status(200).json({ success: true })
      } catch (error) {
        return response.status(200).json({ success: false })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async changeProfileBg({ auth, request, response }) {
    if (auth.user) {
      try {
        let update_key = new AwsKeyController()
        request.params.type = 2
        update_key.addUserKey({ auth, request, response })

        const saveUser = await User.query()
          .where('id', '=', auth.user.id)
          .update({ profile_bg: request.input('profile_bg') })
        return response.status(200).json({ success: true })
      } catch (error) {
        return response.status(200).json({ success: false })
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async storePublicKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const user = await User.query()
          .where('id', '=', auth.user.id)
          .first()
        const publicKey = request.input('publicKey')
        const previousKey = user.toJSON().public_key
        if (previousKey !== publicKey) {
          const chats = await UserChat.query()
            .where('user_id', auth.user.id)
            .fetch()
          chats.toJSON().forEach((chat) => {
            broadcast('chat:*', `chat:${chat.chat_id}`, 'chat:encryption', { publicKey, userId: auth.user.id })
          })
        }
        await User.query()
          .where('id', '=', auth.user.id)
          .update({ public_key: publicKey })
        return response.status(200).json({ success: true })
      } catch (error) {
        return response.status(200).json({ success: false })
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = UserController
