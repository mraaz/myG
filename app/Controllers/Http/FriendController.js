'use strict'

const Database = use('Database')
const Friends = use('App/Models/Friend')

class FriendController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const addFriend = await Friends.create({
          friend_id: request.input('friend_id'),
          user_id: auth.user.id,
        })
        const addFriendViceVersa = await Friends.create({
          user_id: request.input('friend_id'),
          friend_id: auth.user.id,
        })
        return 'Saved item'
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
  async showallmyFriends({ auth, request, response }) {
    try {
      const showallMyFriends = await Database.from('friends')
        .innerJoin('users', 'users.id', 'friends.friend_id')
        .where({ user_id: auth.user.id })
        .orderBy('friends.created_at', 'desc')
        .select('friends.friend_id', 'users.first_name', 'users.last_name', 'users.alias', 'users.profile_img')
        .paginate(request.input('counter'), 10)

      const showCountallMyFriends = await Database.from('friends')
        .where({ user_id: auth.user.id })
        .count('id as total_friends')

      return {
        showallMyFriends: showallMyFriends,
        myFriendsLength: showCountallMyFriends,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = FriendController
