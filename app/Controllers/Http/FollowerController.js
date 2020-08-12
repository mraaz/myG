'use strict'

const Follower = use('App/Models/Follower')
const Database = use('Database')
const UserStatTransactionController = use('./UserStatTransactionController')

class FollowerController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newFollower = await Follower.create({
          follower_id: request.input('follower_id'),
          user_id: auth.user.id,
        })

        let userStatController = new UserStatTransactionController()
        userStatController.update_total_number_of(request.input('follower_id'), 'total_number_of_followers')

        return 'Saved'
      } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = FollowerController
