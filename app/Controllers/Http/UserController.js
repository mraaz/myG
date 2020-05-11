'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const AwsKeyController = use('./AwsKeyController')
const UserStatTransactionController = use('./UserStatTransactionController')

class UserController {
  async profile({ auth, request, response }) {
    var friend = undefined,
      following = undefined
    try {
      const user = await User.query()
        .where('id', '=', request.params.id)
        .fetch()
      if (auth.user.id != request.params.id) {
        friend = await Database.from('friends').where({
          user_id: auth.user.id,
          friend_id: request.params.id,
        })

        following = await Database.from('followers').where({
          user_id: auth.user.id,
          follower_id: request.params.id,
        })
      }

      return {
        user: user.toJSON(),
        friend: friend === undefined || friend.length == 0 ? false : true,
        following: following === undefined || following.length == 0 ? false : true,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async profile_with_alias({ auth, request, response }) {
    try {
      const user = await Database.from('users')
        .where('alias', '=', request.params.alias)
        .first()
      const friend = await Database.from('friends').where({
        user_id: auth.user.id,
        friend_id: user.id,
      })

      return {
        user: user,

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
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
  // async follow({ auth, request, response }) {
  //   if (auth.user) {
  //     try {
  //       const followedUser = await Database.table('friends').insert({
  //         user_id: auth.user.id,
  //         friend_id: request.params.id,
  //       })
  //       //const vicevesa = await Database.table('friends').insert({user_id:request.params.id , friend_id: auth.user.id})
  //
  //       let userStatController = new UserStatTransactionController()
  //       userStatController.update_total_number_of({ auth, request, response }, 'total_number_of_followers')
  //
  //       return 'Saved successfully'
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     return 'You are not Logged In!'
  //   }
  // }
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

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_friends')
        userStatController.update_total_number_of(request.params.id, 'total_number_of_friends')

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
      const playerSearchResults = await Database.table('users')
        .whereNot({ id: auth.user.id })
        .andWhere('alias', 'like', '%' + request.input('alias') + '%')
        .select('alias as first', 'profile_img', 'id')
        .limit(8)

      return {
        playerSearchResults,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async keywordSearchResults({ auth, request, response }) {
    try {
      const playerSearchResults = await Database.table('users')
        .whereNot({ id: auth.user.id })
        .andWhere('alias', 'like', '%' + request.input('keywords') + '%')
        .select('alias', 'profile_img', 'id')
        .paginate(request.input('counter'), 88)

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

  async convertAliastoID({ auth, request, response }) {
    if (auth.user) {
      try {
        const aliasConverted = await Database.table('users')
          .where({
            alias: request.params.alias,
          })
          .select('id')

        return aliasConverted
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async toggleNotificationSounds({ auth, request }) {
    if (auth.user) {
      try {
        await User.query()
          .where('id', '=', auth.user.id)
          .update({
            notification_sounds_disabled: request.only('disabled').disabled
          });
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

}

module.exports = UserController
