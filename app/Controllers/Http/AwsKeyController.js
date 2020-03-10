'use strict'
const Database = use('Database')
const AwsKey = use('App/Models/AwsKey')
const User = use('App/Models/User')
const ApiController = use('./ApiController')

class AwsKeyController {
  async addUserKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_user = await Database.from('aws_keys').where({ user_id: auth.user.id, type: request.params.type })

        for (var i = 0; i < aws_entry_for_this_user.length; i++) {
          request.params.key = aws_entry_for_this_user[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
        var delete_aws_entry_for_this_user = await Database.table('aws_keys')
          .where({
            user_id: auth.user.id,
            type: request.params.type,
          })
          .delete()

        const addAwsKey = await AwsKey.create({
          aws_key: request.input('aws_key'),
          user_id: auth.user.id,
          type: request.params.type,
        })
        return addAwsKey
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async addPostKey({ auth, request, response }) {
    if (auth.user) {
      try {
        // const aws_entry_for_this_user = await Database.from('aws_keys').where({
        //   post_id: request.params.post_id,
        //   type: request.params.type,
        // })
        //
        // for (var i = 0; i < aws_entry_for_this_user.length; i++) {
        //   request.params.key = aws_entry_for_this_user[i].aws_key
        //   let remove_file = new ApiController()
        //   remove_file.deleteFile_server({ auth, request, response })
        // }
        // var delete_aws_entry_for_this_user = await Database.table('aws_keys')
        //   .where({
        //     user_id: auth.user.id,
        //     type: request.params.type,
        //   })
        //   .delete()
        var tmp_keys = request.input('file_keys')

        for (var i = 0; i < tmp_keys.length; i++) {
          let addAwsKey = await AwsKey.create({
            aws_key: tmp_keys[i],
            post_id: request.params.post_id,
            type: 3,
          })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }

  async deletePostKey({ auth, request, response }) {
    if (auth.user) {
      try {
        const aws_entry_for_this_post = await Database.from('aws_keys').where({
          post_id: request.params.id,
        })

        for (var i = 0; i < aws_entry_for_this_post.length; i++) {
          request.params.key = aws_entry_for_this_post[i].aws_key
          let remove_file = new ApiController()
          remove_file.deleteFile_server({ auth, request, response })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return 'You are not Logged In!'
    }
  }
}

module.exports = AwsKeyController
