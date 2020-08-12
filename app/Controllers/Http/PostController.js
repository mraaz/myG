'use strict'

const Post = use('App/Models/Post')
const HashTags = use('App/Models/HashTag')
const Database = use('Database')

const AwsKeyController = use('./AwsKeyController')
const LikeController = use('./LikeController')
const PostHashTagTransactionController = use('./PostHashTagTransactionController')
const HashTagController = use('./HashTagController')

const MAX_HASH_TAGS = 21

class PostController {
  async store({ auth, request, response }) {
    try {
      let arrGroups_id = [],
        newPost = ''

      if (request.input('groups_id') != undefined) {
        arrGroups_id = request.input('groups_id').split(',')
      }

      if (auth.user) {
        if (arrGroups_id.length == 0) {
          newPost = await Post.create({
            content: request.input('content'),
            user_id: auth.user.id,
            type: 'text',
            group_id: request.input('groups_id'),
            visibility: request.input('visibility'),
            media_url: request.input('media_url'),
          })

          if (request.input('hash_tags') != null && request.input('hash_tags').length > 0) {
            await this.process_hash_tags({ auth }, request.input('hash_tags'), newPost.id)
          }
        } else {
          for (var i = 0; i < arrGroups_id.length; i++) {
            newPost = await Post.create({
              content: request.input('content'),
              user_id: auth.user.id,
              type: 'text',
              group_id: arrGroups_id[i],
              visibility: request.input('visibility'),
              media_url: request.input('media_url'),
            })
            if (request.input('hash_tags') != null && request.input('hash_tags').length > 0) {
            }
            await this.process_hash_tags({ auth }, request.input('hash_tags'), newPost.id)
          }
        }

        if (request.input('file_keys') != undefined) {
          let update_key = new AwsKeyController()
          request.params.post_id = newPost.id
          update_key.addPostKey({ auth, request, response })
        }

        request.params.id = newPost.id
        newPost = this.myshow({ auth, request, response })

        return newPost
      }
    } catch (error) {
      console.log(error)
    }
  }

  async process_hash_tags({ auth }, hash_tags, post_id) {
    var arrTags = JSON.parse(hash_tags)
    let PHController = new PostHashTagTransactionController()

    for (var i = 0; i < MAX_HASH_TAGS && i < arrTags.length; i++) {
      if (arrTags[i].hash_tag_id == null) {
        if (/['/.%#$;`\\]/.test(arrTags[i].value)) {
          continue
        }

        let hash_tags_Controller = new HashTagController()
        const hash_tag_id = await hash_tags_Controller.store({ auth }, arrTags[i].value)
        await PHController.store({ auth }, post_id, hash_tag_id)
      } else {
        await PHController.store({ auth }, post_id, arrTags[i].hash_tag_id)
        const update_counter = await HashTags.query()
          .where({ id: arrTags[i].hash_tag_id })
          .increment('counter', 1)
      }
    }
  }

  async storephoto({ auth, request, response }) {
    let arrGroups_id = [],
      newPost = ''

    if (request.input('groups_id') != null) {
      arrGroups_id = request.input('groups_id').split(',')
    }
    if (auth.user) {
      try {
        if (arrGroups_id.length == 0) {
          newPost = await Post.create({
            content: request.input('content'),
            user_id: auth.user.id,
            type: 'photo',
            group_id: request.input('groups_id'),
            visibility: request.input('visibility'),
            media_url: request.input('media_url'),
          })
        } else {
          for (var i = 0; i < arrGroups_id.length; i++) {
            newPost = await Post.create({
              content: request.input('content'),
              user_id: auth.user.id,
              type: 'photo',
              group_id: arrGroups_id[i],
              visibility: request.input('visibility'),
              media_url: request.input('media_url'),
            })
          }
        }

        let update_key = new AwsKeyController()
        request.params.post_id = newPost.id
        update_key.addPostKey({ auth, request, response })

        return newPost
      } catch (error) {
        console.log(error)
      }
    }
  }

  async storevideo({ auth, request, response }) {
    let arrGroups_id = [],
      newPost = ''

    if (request.input('groups_id') != null) {
      arrGroups_id = request.input('groups_id').split(',')
    }

    if (auth.user) {
      try {
        if (arrGroups_id.length == 0) {
          newPost = await Post.create({
            content: request.input('content'),
            user_id: auth.user.id,
            type: 'video',
            group_id: request.input('groups_id'),
            visibility: request.input('visibility'),
            media_url: request.input('media_url'),
          })
        } else {
          for (var i = 0; i < arrGroups_id.length; i++) {
            newPost = await Post.create({
              content: request.input('content'),
              user_id: auth.user.id,
              type: 'video',
              group_id: arrGroups_id[i],
              visibility: request.input('visibility'),
              media_url: request.input('media_url'),
            })
          }
        }

        let update_key = new AwsKeyController()
        request.params.post_id = newPost.id
        update_key.addPostKey({ auth, request, response })

        return newPost
      } catch (error) {
        console.log(error)
      }
    }
  }

  async show({ auth, request, response }) {
    try {
      // const myFriendsPosts = await Database.select('*', 'posts.id', 'posts.updated_at')
      //   .from('friends')
      //   .innerJoin('posts', 'posts.user_id', 'friends.friend_id')
      //   .innerJoin('users', 'users.id', 'posts.user_id')
      //   .where('friends.user_id', '=', auth.user.id)
      //   .whereNot('posts.visibility', '=', 0)
      //   .orderBy('posts.created_at', 'desc')
      //   .paginate(request.params.paginateNo, 10)

      let ppl_im_following_Posts = await Database.select('*', 'posts.id', 'posts.updated_at')
        .from('followers')
        .innerJoin('posts', 'posts.user_id', 'followers.follower_id')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('followers.user_id', '=', auth.user.id)
        .where('posts.visibility', '=', 1)
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      // const _1stpass = [...myFriendsPosts.data, ...ppl_im_following_Posts.data]
      // const uniqueSet = new Set(_1stpass)
      ppl_im_following_Posts = ppl_im_following_Posts.data

      let myPosts = await this.get_additional_info({ auth, request, response }, ppl_im_following_Posts)
      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myshow({ auth, request, response }) {
    try {
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .limit(1)

      myPosts = await this.get_additional_info({ auth, request, response }, myPosts)

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async showpost({ auth, request, response }) {
    try {
      let myPost = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')

      myPost = await this.get_additional_info({ auth, request, response }, myPost)

      return {
        myPost,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async showmyposts({ auth, request, response }) {
    try {
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ user_id: auth.user.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      myPosts = await this.get_additional_info({ auth, request, response }, myPosts.data)

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async get_group_posts({ auth, request, response }) {
    try {
      let groupPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ group_id: request.params.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      groupPosts = await this.get_additional_info({ auth, request, response }, groupPosts.data)

      return {
        groupPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async posts_count({ auth, request, response }) {
    try {
      const no_of_my_posts = await Database.from('posts')
        .where({ id: request.params.id, user_id: auth.user.id })
        .count('* as no_of_my_posts')

      return {
        no_of_my_posts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        let delete_files = new AwsKeyController()
        await delete_files.deletePostKey({ auth, request, response })

        const delete_post = await Database.table('posts')
          .where({
            id: request.params.id,
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

  async update({ auth, request, response }) {
    if (auth.user) {
      try {
        const updatePost = await Post.query()
          .where({ id: request.params.id })
          .update({ content: request.input('content') })
        return 'Saved successfully'
      } catch (error) {
        console.log(error)
      }
    }
  }

  async get_additional_info({ auth, request, response }, post) {
    try {
      let likeController = new LikeController()
      for (var i = 0; i < post.length; i++) {
        request.params.id = post[i].id
        var myLikes = await likeController.show({ auth, request, response })

        post[i].total = myLikes.number_of_likes[0].total
        post[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          post[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          post[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          post[i].do_I_like_it = true
        } else {
          post[i].do_I_like_it = false
        }

        const myHashTags = await Database.from('post_hash_tag_transactions')
          .innerJoin('hash_tags', 'hash_tags.id', 'post_hash_tag_transactions.hash_tag_id')
          .where('post_hash_tag_transactions.post_id', '=', post[i].id)
          .select('hash_tags.content', 'hash_tags.id')
          .orderBy('post_hash_tag_transactions.updated_at', 'desc')

        post[i].hash_tags = myHashTags
      }
    } catch (error) {
      console.log(error)
    }

    return post
  }
}

module.exports = PostController
