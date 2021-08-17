'use strict'

const Database = use('Database')
const Friends = use('App/Models/Friend')

const UserStatTransactionController = use('./UserStatTransactionController')
const FollowerController = use('./FollowerController')

const ChatRepository = require('../../Repositories/Chat')
const NotificationsRepository = require('../../Repositories/Notifications')
const AchievementsRepository = require('../../Repositories/Achievements')
const LoggingRepository = require('../../Repositories/Logging')

class FriendController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        await Friends.create({
          friend_id: request.input('friend_id'),
          user_id: auth.user.id
        })
        await Friends.create({
          user_id: request.input('friend_id'),
          friend_id: auth.user.id
        })

        await Database.table('notifications')
          .where({
            user_id: request.input('friend_id'),
            other_user_id: auth.user.id,
            activity_type: 1
          })
          .delete()

        await AchievementsRepository.registerQuestStep({ user_id: auth.user.id, type: 'friend' })
        await AchievementsRepository.registerQuestStep({ user_id: request.input('friend_id'), type: 'friend' })

        const userId = auth.user.id
        const notifications = await NotificationsRepository.count({ auth: { user: { id: userId } }, request: null })
        await ChatRepository.publishNotifications({ userId, notifications })

        const myFollowerController = new FollowerController()
        myFollowerController.store2({ auth }, request.input('friend_id'), auth.user.id)
        myFollowerController.store2({ auth }, auth.user.id, request.input('friend_id'))

        const userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(auth.user.id, 'total_number_of_friends')
        userStatController.update_total_number_of(request.input('friend_id'), 'total_number_of_friends')

        return 'Saved item'
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error
        })
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
        .select('friends.friend_id', 'users.alias', 'users.profile_img')
        .paginate(request.input('counter'), 50)

      const showCountallMyFriends = await Database.from('friends').where({ user_id: auth.user.id }).count('id as total_friends')

      return {
        showallMyFriends: showallMyFriends,
        myFriendsLength: showCountallMyFriends
      }
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
    }
  }
}

module.exports = FriendController
