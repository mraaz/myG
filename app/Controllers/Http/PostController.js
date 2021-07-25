'use strict'

const Post = use('App/Models/Post')
const HashTags = use('App/Models/HashTag')
const SponsoredPost = use('App/Models/SponsoredPost')
const Database = use('Database')

const LikeController = use('./LikeController')
const PostHashTagTransactionController = use('./PostHashTagTransactionController')
const HashTagController = use('./HashTagController')
const LoggingRepository = require('../../Repositories/Logging')
const ApiController = use('./ApiController')
const CommonController = use('./CommonController')
const AchievementsRepository = require('../../Repositories/Achievements')

//const { validate } = use('Validator')

const MAX_HASH_TAGS = 21

class PostController {
  async store({ auth, request, response }) {
    try {
      let arrGroups_id = [],
        newPost = ''

      if (request.input('group_id') != undefined && String(request.input('group_id')).trim().length > 0) {
        arrGroups_id = String(request.input('group_id')).split(',')
      }

      if (request.input('video') != undefined && request.input('video').trim() != '') {
        // const rules = {
        //   video: 'url',
        // }
        //
        // const validation = await validate(request.input('video'), rules)
        let pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
          'i'
        ) // fragment locator

        if (!pattern.test(request.input('video').trim())) {
          return 'video_link_failed'
        }
      }

      if (auth.user) {
        if (arrGroups_id.length == 0) {
          newPost = await Post.create({
            content: request.input('content'),
            video: request.input('video').trim() == '' ? null : request.input('video'),
            user_id: auth.user.id,
            type: 'text',
            group_id: null,
            visibility: request.input('visibility'),
            media_url: request.input('media_url')
          })

          if (request.input('hash_tags') != undefined && request.input('hash_tags') != null && request.input('hash_tags').length > 0) {
            await this.process_hash_tags({ auth }, request.input('hash_tags'), newPost.id)
          }
        } else {
          for (var i = 0; i < arrGroups_id.length; i++) {
            newPost = await Post.create({
              content: request.input('content'),
              video: request.input('video').trim() == '' ? null : request.input('video'),
              user_id: auth.user.id,
              type: 'text',
              group_id: arrGroups_id[i],
              visibility: request.input('visibility'),
              media_url: request.input('media_url')
            })
            if (request.input('hash_tags') != undefined && request.input('hash_tags') != null && request.input('hash_tags').length > 0) {
              await this.process_hash_tags({ auth }, request.input('hash_tags'), newPost.id)
            }
          }
        }
        let tmpArr = request.input('aws_key_id')

        if (tmpArr != undefined && tmpArr.length > 0) {
          const apiController = new ApiController()
          for (let i = 0; i < tmpArr.length; i++) {
            const alicia_key = await apiController.update_aws_keys_entry({ auth }, tmpArr[i], '3', newPost.id)
          }
        }

        request.params.id = newPost.id
        newPost = this.myshow({ auth, request, response })

        await AchievementsRepository.registerQuestStep({ user_id: auth.user.id, type: 'post' })
        return newPost
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
        await HashTags.query().where({ id: arrTags[i].hash_tag_id }).increment('counter', 1)
      }
    }
  }

  async show({ auth, request, response }) {
    try {
      let grp_limit = 3

      let ppl_im_following_Posts = await Database.from('followers')
        .innerJoin('posts', 'posts.user_id', 'followers.follower_id')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('followers.user_id', '=', auth.user.id)
        .where('posts.visibility', '=', 1)
        .where('posts.group_id', 'is', null)
        .select('*', 'posts.id', 'posts.updated_at', 'posts.created_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.counter, 10)

      switch (parseInt(ppl_im_following_Posts.data.length)) {
        case 11:
          grp_limit = 2
          break
        case 10:
          grp_limit = 3
          break
        case 9:
          grp_limit = 4
          break
        case 8:
          grp_limit = 5
          break
        case 7:
          grp_limit = 6
          break
        case 6:
          grp_limit = 7
          break
        case 5:
          grp_limit = 8
          break
        case 4:
          grp_limit = 9
          break
        case 3:
          grp_limit = 10
          break
        case 2:
          grp_limit = 11
          break
        case 1:
          grp_limit = 12
          break
        case 0:
          grp_limit = 13
          break
        default:
          grp_limit = 13
      }

      const all_groups_im_in_ish = Database.from('groups')
        .leftJoin('usergroups', 'usergroups.group_id', 'groups.id')
        .where('usergroups.user_id', '=', auth.user.id)
        .orWhere('groups.user_id', '=', auth.user.id)
        .select('groups.id')

      // *** UnDO once we have alot more content on the site ***

      //   var today = new Date()
      //   var priorDate = new Date().setDate(today.getDate() - 7)
      //   const cutOff_date = new Date(priorDate)

      let groups_im_in_Posts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .innerJoin('groups', 'groups.id', 'posts.group_id')
        .whereIn('posts.group_id', all_groups_im_in_ish)
        .where('posts.visibility', '=', 1)
        //.where('posts.created_at', '>', cutOff_date)
        .whereNot('posts.user_id', '=', auth.user.id)
        .select('*', 'posts.id', 'posts.updated_at', 'posts.created_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.counter, grp_limit)

      //const category = request.params.counter % 5

      let _1stpass = [...ppl_im_following_Posts.data, ...groups_im_in_Posts.data]

      const common_Controller = new CommonController()
      _1stpass = await common_Controller.shuffle(_1stpass)

      if (_1stpass.length == 0) {
        let welcome_Posts = await Database.from('posts')
          .innerJoin('users', 'users.id', 'posts.user_id')
          .whereBetween('posts.id', [1, 3])
          .orderBy('posts.id', 'asc')
          .select('*', 'posts.id', 'posts.updated_at', 'posts.created_at')

        _1stpass = [..._1stpass, ...welcome_Posts]
      }

      // **RAAZ removed since we're not having AD's atm
      //let get_sponsored_posts = undefined

      //   if (!isNaN(category) && _1stpass.length > 2) {
      //     let get_Origin_info = await Database.from('users_additional_infos')
      //       .where('user_id', '=', auth.user.id)
      //       .first()

      //     if (get_Origin_info == undefined) {
      //       get_Origin_info = { logged_in_country_code: null }
      //     }

      //     if (get_Origin_info.in_eu == true) get_Origin_info.logged_in_country_code = 'EU'

      //     const get_sponsored_posts_total = await Database.from('sponsored_posts')
      //       .where('visibility', '=', 1)
      //       .where('category', '=', category)
      //       .count('* as total')

      //     get_sponsored_posts = await Database.from('sponsored_posts')
      //       .leftJoin('sponsored_posts_transactions', 'sponsored_posts_transactions.sponsored_posts_id', 'sponsored_posts.id')
      //       .where('visibility', '=', 1)
      //       .where('category', '=', category)
      //       .where('sponsored_posts_transactions.id', 'is', null)
      //       .where((bd) => {
      //         bd.orWhere({ country_code: get_Origin_info.logged_in_country_code }).orWhere('country_code', 'is', null)
      //       })
      //       .select('sponsored_posts.*')
      //       .orderBy('updated_at', 'desc')
      //       .limit(Math.floor(Math.random() * parseInt(get_sponsored_posts_total[0].total)))

      //     if (get_sponsored_posts != undefined && get_sponsored_posts.length > 0) {
      //       const randValue = Math.floor(Math.random() * (get_sponsored_posts.length - 1 + 1)) + 0
      //       get_sponsored_posts = get_sponsored_posts[randValue]
      //     } else {
      //       get_sponsored_posts = await Database.from('sponsored_posts')
      //         .where('visibility', '=', 1)
      //         .select('*')
      //         .orderBy('updated_at', 'desc')
      //         .limit(88)
      //       const randValue = Math.floor(Math.random() * (get_sponsored_posts.length - 1 + 1)) + 0
      //       get_sponsored_posts = get_sponsored_posts[randValue]
      //     }

      //     if (get_sponsored_posts != undefined) {
      //       get_sponsored_posts.sponsored_post = true
      //       _1stpass.splice(1, 0, get_sponsored_posts)
      //     }
      //   }

      const myPosts = await this.get_additional_info({ auth }, _1stpass)

      return {
        myPosts
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

  async myshow({ auth, request, response }) {
    try {
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .where('visibility', '=', 1)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .limit(1)

      myPosts = await this.get_additional_info({ auth }, myPosts)

      return {
        myPosts
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

  async showpost({ auth, request, response }) {
    try {
      let myPost = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')

      myPost = await this.get_additional_info({ auth }, myPost)

      return {
        myPost
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

  async fetchGuestPost({ request }) {
    try {
      let posts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', request.params.id)
        .select('*', 'posts.id', 'posts.created_at', 'posts.updated_at')
        .limit(1);
      posts = await this.get_additional_info({ auth: { user: { id: null } } }, posts);
      return posts[0];
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

  /**
   * For showing a users own posts, including private posts. Designed to be triggered when looking at your own profile.
   *
   * @param {auth, request, response} param0 Data sent from the frontend.
   * @returns {Object | string} A Object containing the users own posts, including private posts, or a string indicating you aren't logged in.
   */
  async showMyPosts({ auth, request, response }) {
    if (!auth.user.id) return 'You are not Logged In!'
    return await this.showPosts(auth, auth.user.id, request.params.paginateNo, [0, 1])
  }

  async fetchGuestPostsForUser({ request }) {
    try {
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ user_id: request.params.profileId })
        .whereIn('posts.visibility', [1])
        .select('*', 'posts.id', 'posts.updated_at', 'posts.created_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.params.paginateNo, 10)
      myPosts = await this.get_additional_info({ auth: { user: -1 } }, myPosts.data);
      return { myPosts };
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      });
      return { myPosts: [] };
    }
  }

  /**
   * For showing all the posts of a specific user. Designed to be triggered when looking at another users profile.
   *
   * @param {auth, request, response} param0 Data sent from the frontend.
   * @returns {Object | string} A Object containing a list of posts from a specific user, excluding private posts, or a string indicating you aren't logged in.
   */
  async showUsersPosts({ auth, request, response }) {
    if (!auth.user.id) return 'You are not Logged In!'
    return await this.showPosts(auth, request.params.userId, request.params.paginateNo, [1])
  }

  /**
   * Private function, to be triggered by `showUsersPosts` and `showMyPosts`.
   * The underlying shared logic for fetching posts for a user.
   *
   * @param {Object} auth A object containing authentication information.
   * @param {string} user_id The user whos posts are being queried.
   * @param {number} paginateNo The pagination number we are up to.
   * @param {number[]} visibility A array listing visibility settings allowed for the posts. Can be 0, 1, 2, or 3.
   * @returns {Object} A object containing a list of posts matching the provided input.
   */
  async showPosts(auth, user_id, paginateNo, visibility) {
    try {
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ user_id })
        .whereIn('posts.visibility', visibility)
        .select('*', 'posts.id', 'posts.updated_at', 'posts.created_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(paginateNo, 10)

      myPosts = await this.get_additional_info({ auth }, myPosts.data)

      return {
        myPosts
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

  async get_group_posts_internal({ auth }, group_id, counter) {
    try {
      let groupPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where({ group_id: group_id, visibility: 1 })
        .select('posts.*', 'posts.id', 'posts.updated_at', 'users.alias', 'users.profile_img')
        .orderBy('posts.created_at', 'desc')
        .paginate(counter, 10)

      groupPosts = await this.get_additional_info({ auth }, groupPosts.data)
      groupPosts = await this.get_game_data(groupPosts)

      return {
        groupPosts
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

  async get_group_posts({ auth, request, response }) {
    try {
      let groupPosts = []

      switch (request.input('type')) {
        case 'Recents':
          groupPosts = await Database.from('posts')
            .innerJoin('users', 'users.id', 'posts.user_id')
            .where({ group_id: request.input('group_id'), visibility: 1 })
            .select('posts.*', 'posts.id', 'posts.created_at', 'posts.updated_at', 'users.alias', 'users.profile_img')
            .orderBy('posts.created_at', 'desc')
            .paginate(request.input('counter'), 10)

          break
        case 'Featured':
          groupPosts = await Database.from('posts')
            .innerJoin('users', 'users.id', 'posts.user_id')
            .where({ group_id: request.input('group_id'), featured: true, visibility: 1 })
            .select('posts.*', 'posts.id', 'posts.created_at', 'posts.updated_at', 'users.alias', 'users.profile_img')
            .orderBy('posts.created_at', 'desc')
            .paginate(request.input('counter'), 10)

          break
        default:
          groupPosts = await Database.from('posts')
            .innerJoin('users', 'users.id', 'posts.user_id')
            .where({ group_id: request.input('group_id'), visibility: 1 })
            .select('posts.*', 'posts.id', 'posts.created_at', 'posts.updated_at', 'users.alias', 'users.profile_img')
            .orderBy('posts.created_at', 'desc')
            .paginate(request.input('counter'), 10)
      }

      groupPosts = await this.get_additional_info({ auth }, groupPosts.data)
      groupPosts = await this.get_game_data(groupPosts)

      return {
        groupPosts
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

  async get_game_data(groupPosts) {
    try {
      for (let i = 0; i < groupPosts.length; i++) {
        if (groupPosts[i].schedule_games_id != null) {
          let getScheduleDetails = await Database.from('schedule_games')
            .innerJoin('users', 'users.id', 'schedule_games.user_id')
            .innerJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
            .where('schedule_games.id', '=', groupPosts[i].schedule_games_id)
            .where('schedule_games.expiry', '>', Database.fn.now())
            .select(
              'game_names.game_name',
              'schedule_games.start_date_time',
              'users.alias',
              'users.profile_img',
              'schedule_games.schedule_games_GUID',
              'schedule_games.id',
              'users.id as user_id'
            )
            .first()

          if (getScheduleDetails != undefined) {
            groupPosts[i].game_name = getScheduleDetails.game_name
            groupPosts[i].game_schedule_games_GUID = getScheduleDetails.schedule_games_GUID
            groupPosts[i].gamer_alias = getScheduleDetails.alias
            groupPosts[i].game_start_date_time = getScheduleDetails.start_date_time
          }
        }
      }

      return {
        groupPosts
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

  async posts_count({ auth, request, response }) {
    try {
      const no_of_my_posts = await Database.from('posts')
        .where({ id: request.params.id, user_id: auth.user.id, visibility: 1 })
        .count('* as no_of_my_posts')

      return {
        no_of_my_posts
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

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('posts').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        const apiController = new ApiController()
        await apiController.internal_deleteFile({ auth }, '3', request.params.id)

        const delete_post = await Database.table('posts')
          .where({
            id: request.params.id
          })
          .delete()

        await AchievementsRepository.unregisterQuestStep({ user_id: auth.user.id, type: 'post' })
        return 'Deleted successfully'
      } catch (error) {
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

  async update({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('posts').where({ id: request.params.id }).first()

        if (security_check == undefined || security_check.user_id != auth.user.id) {
          return
        }

        await Post.query()
          .where({ id: request.params.id })
          .update({ content: request.input('content') })

        return 'Saved successfully'
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

  async get_additional_info({ auth }, post) {
    if (post == undefined) {
      return post
    }
    try {
      const likeController = new LikeController()
      for (let i = 0; i < post.length; i++) {
        if (post[i] == undefined) {
          continue
        }
        if (post[i].id == undefined || post[i].id == null || post[i].id == '' || post[i].sponsored_post == true) {
          continue
        }

        let myLikes = await likeController.show({ auth }, post[i].id)
        if (myLikes) {
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
        }

        const myHashTags = await Database.from('post_hash_tag_transactions')
          .innerJoin('hash_tags', 'hash_tags.id', 'post_hash_tag_transactions.hash_tag_id')
          .where('post_hash_tag_transactions.post_id', '=', post[i].id)
          .select('hash_tags.content', 'hash_tags.id')
          .orderBy('post_hash_tag_transactions.updated_at', 'desc')

        post[i].hash_tags = myHashTags
      }
      return post
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return post
    }
  }

  async featureToggle({ auth, request, response }) {
    if (auth.user) {
      try {
        await Post.query()
          .where({ id: request.input('post_id') })
          .update({ featured: request.input('featured_enabled') })

        return 'Saved successfully'
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

  async showHashTagPosts({ auth, request, response }) {
    try {
      const getOne = await Database.from('hash_tags')
        .where({ content: decodeURIComponent(request.input('content')) })
        .first()

      if (getOne == undefined) {
        return
      }
      let myPosts = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .innerJoin('post_hash_tag_transactions', 'post_hash_tag_transactions.post_id', 'posts.id')
        .where({ hash_tag_id: getOne.id })
        .select('*', 'posts.id', 'posts.updated_at')
        .orderBy('posts.created_at', 'desc')
        .paginate(request.input('counter'), 10)

      myPosts = await this.get_additional_info({ auth }, myPosts.data)

      return {
        myPosts
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

  async shuffle_sponsored_posts() {
    try {
      /*
       Get all records
       order them by times clicked
       divide them equally
       update the categories
      */

      let get_sponsored_posts = await Database.from('sponsored_posts')
        .where('visibility', '=', 1)
        .select('id')
        .orderBy('times_clicked', 'desc')

      let arr = []
      if (get_sponsored_posts == undefined) return
      for (let i = 0; i < get_sponsored_posts.length; i++) {
        arr.push(get_sponsored_posts[i].id)
      }

      const myGroups = this.splitArrayEvenly(arr, 5)

      //Nested for loop OK cause this table will be <~100 records
      for (let i = 0; i < myGroups.length; i++) {
        for (let j = 0; j < myGroups[i].length; j++) {
          await SponsoredPost.query()
            .where({ id: myGroups[i][j] })
            .update({ category: i + 1 })
        }
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

  splitArrayEvenly(array, n) {
    array = array.slice()
    let result = []
    while (array.length) {
      result.push(array.splice(0, Math.ceil(array.length / n--)))
    }
    return result
  }
}

module.exports = PostController
