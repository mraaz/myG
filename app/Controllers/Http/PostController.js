'use strict'

const Post = use('App/Models/Post')
const Database = use('Database')
const AwsKeyController = use('./AwsKeyController')

class PostController {
  async store({ auth, request, response }) {
    const newPost = await Post.create({
      content: request.input('content'),
      user_id: auth.user.id,
      type: 'text',
      group_id: request.input('groups_id'),
    })
    return 'Saved item'
  }

  async show({ auth, request, response }) {
    try {
      //const myPosts = await Post.query().where('user_id', '=', request.params.id).fetch() //for myPost
      //const myPosts = await Post.query().innerJoin('friends', 'user_id', 'post.user_id').options({nestTables:true}).fetch()
      //const following = await Database.from('friends').where({user_id: 1, friend_id: request.params.id})
      //const subquery = await Database.from('friends').where({user_id: 1}).select('id').fetch()

      //const latestPosts = await Post.query().innerJoin('users', 'user_id', 'posts.user_id').options({nestTables:true}).fetch()
      //const myPosts = await Database.from('posts').whereIn('user_id', subquery).orderBy('created_at', 'desc').innerJoin('users', 'users_id', 'posts.user_id').options({nestTables:true}).fetch()

      //const myPosts = await Database.table('posts').innerJoin('users', 'users.id', 'posts.user_id')

      const subquery = Database.select('friend_id')
        .from('friends')
        .where({ user_id: auth.user.id })
      const myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .whereIn('posts.user_id', subquery)
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async myshow({ auth, request, response }) {
    try {
      const myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.user_id', '=', auth.user.id)
        .andWhere('posts.created_at', '>=', request.params.myDate)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')

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

      return {
        myPost,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async showmyposts({ auth, request, response }) {
    try {
      const myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ user_id: auth.user.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

      return {
        myPosts,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async get_group_posts({ auth, request, response }) {
    try {
      const groupPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ group_id: request.params.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)

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
    try {
      const updatePost = await Post.query()
        .where({ id: request.params.id })
        .update({ content: request.input('content') })
      return 'Saved successfully'
    } catch (error) {
      console.log(updatePost)
    }
  }

  async storephoto({ auth, request, response }) {
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

    return 'Saved item'
  }

  async storevideo({ auth, request, response }) {
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
    return 'Saved item'
  }
}

module.exports = PostController
