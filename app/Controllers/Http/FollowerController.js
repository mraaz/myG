'use strict'

const Follower = use('App/Models/Follower')
const Database = use('Database')

class FollowerController {
  async store({ auth, request, response }) {
    if (auth.user) {
      try {
        const newFollower = await Follower.create({
          follower_id: request.input('follower_id'),
          user_id: auth.user.id,
        })
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
