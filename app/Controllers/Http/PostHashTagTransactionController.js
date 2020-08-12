'use strict'
const Database = use('Database')
const PostHashTagTransaction = use('App/Models/PostHashTagTransaction')

class PostHashTagTransactionController {
  async store({ auth }, post_id, hash_tag_id) {
    if (auth.user) {
      try {
        const create_arrTags = PostHashTagTransaction.create({
          post_id: post_id,
          hash_tag_id: hash_tag_id,
        })
        return
      } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
          return
        }
        console.log(error)
      }
    }
  }
}

module.exports = PostHashTagTransactionController
