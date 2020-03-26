'use strict'

const Post = use('App/Models/Post')
const Database = use('Database')
const AwsKeyController = use('./AwsKeyController')
const LikeController = use('./LikeController')

class PostController {
  async store({ auth, request, response }) {
    if (auth.user) {
      const newPost = await Post.create({
        content: request.input('content'),
        user_id: auth.user.id,
        type: 'text',
        group_id: request.input('groups_id'),
        visibility: request.input('visibility'),
      })
      return newPost.id
    }
  }

  async show({ auth, request, response }) {
    // var ourDate = new Date()
    // var subquery
    //
    // //Change it so that it is 7 days in the past.
    // var pastDate = ourDate.getDate() - 2007
    // ourDate.setDate(pastDate)
    try {
      let likeController = new LikeController()
      //const myPosts = await Post.query().where('user_id', '=', request.params.id).fetch() //for myPost
      //const myPosts = await Post.query().innerJoin('friends', 'user_id', 'post.user_id').options({nestTables:true}).fetch()
      //const following = await Database.from('friends').where({user_id: 1, friend_id: request.params.id})
      //const subquery = await Database.from('friends').where({user_id: 1}).select('id').fetch()

      //const latestPosts = await Post.query().innerJoin('users', 'user_id', 'posts.user_id').options({nestTables:true}).fetch()
      //const myPosts = await Database.from('posts').whereIn('user_id', subquery).orderBy('created_at', 'desc').innerJoin('users', 'users_id', 'posts.user_id').options({nestTables:true}).fetch()

      //const myPosts = await Database.table('posts').innerJoin('users', 'users.id', 'posts.user_id')

      const myPosts = await Database.select('*', 'posts.id', 'posts.updated_at')
        .from('friends')
        .innerJoin('posts', 'posts.user_id', 'friends.friend_id')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .innerJoin('followers', 'users.id', 'followers.user_id')
        .where('friends.user_id', '=', auth.user.id)
        .orWhere(function() {
          this.where('followers.user_id', '=', auth.user.id).andWhere('posts.visibility', '=', 1)
        })
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      for (var i = 0; i < myPosts.data.length; i++) {
        request.params.id = myPosts.data[i].id
        var myLikes = await likeController.show({ auth, request, response })

        myPosts.data[i].total = myLikes.number_of_likes[0].total
        myPosts.data[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          myPosts.data[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          myPosts.data[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          myPosts.data[i].do_I_like_it = true
        } else {
          myPosts.data[i].do_I_like_it = false
        }
      }

      // let array = []
      // for (var i = 0; i < get_no_of_friends.length; i++) {
      //   array.push(get_no_of_friends[i].friend_id)
      // }
      // let uniqueArray = [...new Set(array)]

      //console.log(uniqueArray)
      //.orderBy(posts.created_at, desc)

      // if (check_no_of_friends[0].no_of_my_friends > 100) {
      //   const get_no_of_friends = await Database.select('friend_id')
      //     .from('friends')
      //     .innerJoin('posts', 'posts.user_id', 'friends.user_id')
      //     .where('friends.user_id', '=', auth.user.id)
      //     .where('posts.created_at', '>=', ourDate)
      //     .count('* as no_of_my_friends')
      //
      //   if (get_no_of_friends[0].no_of_my_friends == 0) {
      //     pastDate = ourDate.getDate() - 30
      //     ourDate.setDate(pastDate)
      //   }
      //
      //   subquery = Database.select('friend_id')
      //     .from('friends')
      //     .innerJoin('posts', 'posts.user_id', 'friends.user_id')
      //     .where('friends.user_id', '=', auth.user.id)
      //     .where('posts.created_at', '>=', ourDate)
      // } else {
      // const subquery = await Database.select('friend_id')
      //   .from('friends')
      //   .whereIn('id', uniqueArray)
      //
      // console.log(subquery)
      //
      // return
      // const myPosts = await Database.from('posts')
      //   .innerJoin('users', 'users.id', 'posts.user_id')
      //   .whereIn('posts.user_id', uniqueArray)
      //   .select('*', 'posts.id', 'posts.updated_at')
      //   .orderBy('posts.created_at', 'desc')
      //   .paginate(request.params.paginateNo, 10)

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myshow({ auth, request, response }) {
    let likeController = new LikeController()
    try {
      // const myPosts = await Database.from('posts')
      //   .innerJoin('users', 'users.id', 'posts.user_id')
      //   .where('posts.user_id', '=', auth.user.id)
      //   .andWhere('posts.created_at', '>=', request.params.myDate)
      //   .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
      //   .orderBy('posts.created_at', 'desc')
      //   .limit(1)

      const myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.myDate)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .limit(1)

      for (var i = 0; i < myPosts.length; i++) {
        request.params.id = myPosts[i].id
        var myLikes = await likeController.show({ auth, request, response })

        myPosts[i].total = myLikes.number_of_likes[0].total
        myPosts[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          myPosts[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          myPosts[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          myPosts[i].do_I_like_it = true
        } else {
          myPosts[i].do_I_like_it = false
        }
      }

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async showpost({ auth, request, response }) {
    try {
      const myPost = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')

      for (var i = 0; i < myPosts.length; i++) {
        request.params.id = myPosts[i].id
        var myLikes = await likeController.show({ auth, request, response })

        myPosts[i].total = myLikes.number_of_likes[0].total
        myPosts[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          myPosts[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          myPosts[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          myPosts[i].do_I_like_it = true
        } else {
          myPosts[i].do_I_like_it = false
        }
      }

      return {
        myPost,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async showmyposts({ auth, request, response }) {
    let likeController = new LikeController()

    try {
      const myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ user_id: auth.user.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      for (var i = 0; i < myPosts.data.length; i++) {
        request.params.id = myPosts.data[i].id
        var myLikes = await likeController.show({ auth, request, response })

        myPosts.data[i].total = myLikes.number_of_likes[0].total
        myPosts.data[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          myPosts.data[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          myPosts.data[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          myPosts.data[i].do_I_like_it = true
        } else {
          myPosts.data[i].do_I_like_it = false
        }
      }

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async get_group_posts({ auth, request, response }) {
    let likeController = new LikeController()
    try {
      const groupPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ group_id: request.params.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      for (var i = 0; i < groupPosts.data.length; i++) {
        request.params.id = groupPosts.data[i].id
        var myLikes = await likeController.show({ auth, request, response })

        groupPosts.data[i].total = myLikes.number_of_likes[0].total
        groupPosts.data[i].no_of_comments = myLikes.no_of_comments[0].no_of_comments
        if (myLikes.number_of_likes[0].total != 0) {
          groupPosts.data[i].admirer_first_name = myLikes.admirer_UserInfo.alias
        } else {
          groupPosts.data[i].admirer_first_name = ''
        }
        if (myLikes.do_I_like_it[0].myOpinion != 0) {
          groupPosts.data[i].do_I_like_it = true
        } else {
          groupPosts.data[i].do_I_like_it = false
        }
      }

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

  async storephoto({ auth, request, response }) {
    if (auth.user) {
      try {
        const newPost = await Post.create({
          content: request.input('content'),
          media_url: request.input('media_url'),
          user_id: auth.user.id,
          type: 'photo',
          group_id: request.input('groups_id'),
        })

        let update_key = new AwsKeyController()
        request.params.post_id = newPost.id
        update_key.addPostKey({ auth, request, response })

        return newPost.id
      } catch (error) {
        console.log(error)
      }
    }
  }

  async storevideo({ auth, request, response }) {
    if (auth.user) {
      try {
        const newPost = await Post.create({
          content: request.input('content'),
          media_url: request.input('media_url'),
          user_id: auth.user.id,
          type: 'video',
          group_id: request.input('groups_id'),
        })

        let update_key = new AwsKeyController()
        request.params.post_id = newPost.id
        update_key.addPostKey({ auth, request, response })

        return newPost.id
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = PostController
