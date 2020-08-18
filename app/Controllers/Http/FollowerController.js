'use strict'

const Follower = use('App/Models/Follower')
const Database = use('Database')
const UserStatTransactionController = use('./UserStatTransactionController')
const LoggingRepository = require('../../Repositories/Logging')
const ProfileRepository = require('../../Repositories/Profile')

class FollowerController {
  async store({ auth, request }) {
    if (auth.user) {
      try {
        const followerIdInput = request.input('follower_id')
        const alias = request.input('follower_alias')
        const followerId = followerIdInput || (await ProfileRepository.fetchProfileId({ alias }))

        await Follower.create({
          follower_id: followerId,
          user_id: auth.user.id,
        })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(followerId, 'total_number_of_followers')

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

  async store2({ auth }, leader, follower) {
    if (auth.user) {
      try {
        const newFollower = await Follower.create({
          follower_id: leader,
          user_id: follower,
        })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(leader, 'total_number_of_followers')

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

  async delete({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteFollower = await Database.table('followers')
          .where({
            user_id: auth.user.id,
            follower_id: request.params.follower_id,
          })
          .delete()

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(request.params.follower_id, 'total_number_of_followers')

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
}

module.exports = FollowerController
