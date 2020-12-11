'use strict'

const Database = use('Database')
const Report = use('App/Models/Report')
const LoggingRepository = require('../../Repositories/Logging')

// Split the array into halves and merge them recursively
function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(mergeSort(left), mergeSort(right))
}

// compare the arrays item by item and return the concatenated result
function merge(left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].created_at > right[indexRight].created_at) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

class ReportController {
  async store({ auth, request, response }) {
    if (auth.user) {
      // let type = 0
      //
      // if (request.input('post_id') != undefined && request.input('post_id') != '' && request.input('post_id') != null) {
      //   type = 1
      // } else if (request.input('comment_id') != undefined && request.input('comment_id') != '' && request.input('comment_id') != null) {
      //   type = 2
      // } else if (request.input('reply_id') != undefined && request.input('reply_id') != '' && request.input('reply_id') != null) {
      //   type = 3
      // }

      try {
        const newReport = await Report.create({
          user_id: auth.user.id,
          report_description: request.input('report_description'),
          post_id: request.input('post_id'),
          comment_id: request.input('comment_id'),
          reply_id: request.input('reply_id'),
        })
        return newReport
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

  async destroy({ auth, request, response }) {
    if (auth.user) {
      try {
        const security_check = await Database.from('admins')
          .where({ user_id: auth.user.id })
          .first()

        if (security_check == undefined) {
          return
        }

        const delete_report = await Database.table('reports')
          .where({
            id: request.params.id,
          })
          .delete()

        return 'done'
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

  async show({ auth, request, response }) {
    try {
      let singleArr = []

      let allReports_posts = await Database.from('reports')
        .select('reports.id', 'reports.post_id', 'reports.created_at')
        .whereNot('post_id', '=', '')
        .groupBy('reports.post_id')
        .orderBy('reports.created_at', 'desc')
        .paginate(request.params.counter, 10)

      let allReports_comments = await Database.from('reports')
        .groupBy('reports.comment_id')
        .whereNot('comment_id', '=', '')
        .select('reports.id', 'reports.comment_id', 'reports.created_at')
        .orderBy('reports.created_at', 'desc')
        .paginate(request.params.counter, 10)

      let allReports_replies = await Database.from('reports')
        .groupBy('reports.reply_id')
        .whereNot('reply_id', '=', '')
        .select('reports.id', 'reports.reply_id', 'reports.created_at')
        .orderBy('reports.created_at', 'desc')
        .paginate(request.params.counter, 10)

      allReports_posts = allReports_posts.data
      allReports_posts = await this.process_show(allReports_posts, 1)

      allReports_comments = allReports_comments.data
      allReports_comments = await this.process_show(allReports_comments, 2)

      allReports_replies = allReports_replies.data
      allReports_replies = await this.process_show(allReports_replies, 3)

      singleArr.push(...allReports_posts)
      singleArr.push(...allReports_comments)
      singleArr.push(...allReports_replies)

      if (singleArr.length == 0) {
        return singleArr
      } else {
        return (singleArr = mergeSort(singleArr))
      }
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

  //Type: Post =1, Comment = 2, Reply = 3
  async process_show(allReports, type) {
    for (let i = 0; i < allReports.length; i++) {
      const first_two_users = await Database.from('reports')
        .innerJoin('users', 'users.id', 'reports.user_id')
        .where((builder) => {
          if (type == 1) builder.where({ post_id: allReports[i].post_id })
          if (type == 2) builder.where({ comment_id: allReports[i].comment_id })
          if (type == 3) builder.where({ reply_id: allReports[i].reply_id })
        })
        .select('users.alias')
        .orderBy('reports.created_at', 'desc')
        .limit(2)

      const total_post_count = await Database.from('reports')
        .where((builder) => {
          if (type == 1) builder.where({ post_id: allReports[i].post_id })
          if (type == 2) builder.where({ comment_id: allReports[i].comment_id })
          if (type == 3) builder.where({ reply_id: allReports[i].reply_id })
        })
        .count('* as no_of_my_notis')

      const getAllNotiLike_unreadCount = await Database.from('reports')
        .where((builder) => {
          if (type == 1) builder.where({ post_id: allReports[i].post_id, read_status: 0 })
          if (type == 2) builder.where({ comment_id: allReports[i].comment_id, read_status: 0 })
          if (type == 3) builder.where({ reply_id: allReports[i].reply_id, read_status: 0 })
        })
        .count('* as no_of_my_unread')

      const getOwner = await Database.from('posts')
        .innerJoin('users', 'users.id', 'posts.user_id')
        .where('posts.id', '=', allReports[i].post_id)
        .select('users.alias', 'users.profile_img')

      if (first_two_users != undefined) {
        if (first_two_users.length == 2) {
          allReports[i].first_user_alias = first_two_users[0].alias
          allReports[i].second_user_alias = first_two_users[1].alias
        } else if (first_two_users.length == 1) {
          allReports[i].first_user_alias = first_two_users[0].alias
          allReports[i].second_user = null
        } else {
          allReports[i].first_user_alias = null
          allReports[i].second_user_alias = null
        }
      } else {
        allReports[i].first_user_alias = null
        allReports[i].second_user_alias = null
      }

      allReports[i].total_post_count = total_post_count[0].no_of_my_notis > 0 ? total_post_count[0].no_of_my_notis : 0
      allReports[i].read_status = getAllNotiLike_unreadCount[0].no_of_my_unread > 0 ? 0 : 1
      allReports[i].owner_alias = getOwner[0].alias
      allReports[i].owner_profile_img = getOwner[0].profile_img
    }
    return allReports
  }
}

module.exports = ReportController
