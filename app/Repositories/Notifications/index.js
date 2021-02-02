const Database = use('Database')
const LoggingRepository = require('../Logging')
const ChatRepository = require('../Chat')

class NotificationsRepository {
  async getUnread_count({ auth }) {
    if (!auth.user) throw new Error('Auth Error')
    try {
      const security_check = await Database.from('admins').where({ user_id: auth.user.id, permission_level: 1 }).first()
      const isAdmin = security_check != undefined ? true : false;

      let getUnread_count_Alerts = 0
      const getUnread_count_Approvals = await Database.from('notifications')
        .where({ other_user_id: auth.user.id, read_status: 0 })
        .whereIn('activity_type', [1, 11, 12])
        .count('* as no_of_my_unread_approvals')

      const _getUnread_count_Alerts = await Database.from('notifications')
        .where({ other_user_id: auth.user.id, read_status: 0 })
        .whereIn('activity_type', [10, 14, 15, 17, 19, 20, 21, 22, 23])
        .count('* as no_of_my_unread_alerts')

      getUnread_count_Alerts +=
        _getUnread_count_Alerts[0].no_of_my_unread_alerts != undefined ? _getUnread_count_Alerts[0].no_of_my_unread_alerts : 0

      const allMylike_posts = await Database.from('notifications')
        .where({ other_user_id: auth.user.id, read_status: 0 })
        .whereIn('activity_type', [2, 3, 4, 5, 6])
        .groupBy('notifications.post_id')
        .count('* as no_of_my_unread_alerts')

      for (let i = 0; i < allMylike_posts.length; i++) {
        getUnread_count_Alerts += allMylike_posts[i].no_of_my_unread_alerts
      }

      const dropped_out_attendees = await Database.from('notifications')
        .where({ other_user_id: auth.user.id, activity_type: 16, read_status: 0 })
        .groupBy('notifications.schedule_games_id')
        .count('* as no_of_my_unread_alerts')

      for (let i = 0; i < dropped_out_attendees.length; i++) {
        getUnread_count_Alerts += dropped_out_attendees[i].no_of_my_unread_alerts
      }

      return {
        getUnread_count_Approvals: getUnread_count_Approvals[0].no_of_my_unread_approvals,
        getUnread_count_Alerts: getUnread_count_Alerts,
        isAdmin,
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

  async count({ auth, request }) {
    const requestingUserId = auth.user.id
    if (!requestingUserId) throw new Error('Auth Error')
    const { getUnread_count_Approvals: approvals, getUnread_count_Alerts: alerts } = await this.getUnread_count({ auth, request: request || { input: () => {} } })
    const { unreadMessages: chats } = await ChatRepository.fetchUnreadMessages({ requestingUserId, count: true })
    return {
      approvals,
      alerts,
      chats,
    }
  }
}

module.exports = new NotificationsRepository();