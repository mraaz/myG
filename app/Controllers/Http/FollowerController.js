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
        let followerId = request.input('follower_id')
        const followerIdInput = request.input('follower_id')

        if (request.input('follower_alias') != undefined) {
          const alias = request.input('follower_alias')
          followerId = followerIdInput || (await ProfileRepository.fetchProfileId({ alias }))
        }

        await Follower.create({
          follower_id: followerId,
          user_id: auth.user.id,
          group_id: request.input('group_id'),
        })

        const userStatController = new UserStatTransactionController()
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

  async delete2({ auth }, leader, follower) {
    if (auth.user) {
      try {
        const deleteFollower = await Database.table('followers')
          .where({
            user_id: leader,
            follower_id: follower,
          })
          .delete()

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(leader, 'total_number_of_followers')

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

  async delete_group({ auth, request, response }) {
    if (auth.user) {
      try {
        const deleteFollower = await Database.table('followers')
          .where({
            user_id: auth.user.id,
            group_id: request.params.group_id,
          })
          .delete()

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
