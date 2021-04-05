'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const ConnectionController = use('./ConnectionController')
const ChatRepository = require('../../Repositories/Chat')
const LoggingRepository = require('../../Repositories/Logging')

class FacebookLoginController {
  async redirect({ ally }) {
    await ally
      .driver('facebook')
      .stateless()
      .redirect()
  }

  async callback({ ally, auth, request, response, view, session }) {
    if (request.get().error && request.get().error == 'access_denied') {
      return response.redirect('/')
    } else {
      const provider = 'facebook'
      const userData = await ally.driver(provider).getUser()
      try {
        const authUser = await User.query()
          .where({
            provider: provider,
            provider_id: userData.getId(),
          })
          .first()
        if (!(authUser === null)) {
          await auth.loginViaId(authUser.id)
          const connections = new ConnectionController()
          connections.master_controller({ auth })
          const onlineQueryResponse = await Database.from('users').where('status', 'online').count();
          const onlineUsers = onlineQueryResponse[0]['count(*)'];
          if (onlineUsers < 10) await ChatRepository.publishOnMainChannel(`Welcome ${authUser.alias} !!`);
          return response.redirect('/')
        } else {
          session.put('provider', 'facebook')
          session.put('provider_id', userData.getId())
          session.put('email', userData.getEmail())
          session.put('profile_img', userData.getAvatar())
          return response.redirect('/user/register')
        }
      } catch (error) {
        LoggingRepository.log({
          environment: process.env.NODE_ENV,
          type: 'error',
          source: 'backend',
          context: __filename,
          message: (error && error.message) || error,
        })
        return response.redirect('/auth/' + provider)
      }
    }
  }
}

module.exports = FacebookLoginController
