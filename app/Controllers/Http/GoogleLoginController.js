'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const ConnectionController = use('./ConnectionController')
const ChatRepository = require('../../Repositories/Chat')
const LoggingRepository = require('../../Repositories/Logging')

class LoginController {
  async redirect({ ally }) {
    await ally.driver('google').stateless().redirect()
  }

  async callback({ ally, auth, response, view, session }) {
    const provider = 'google'
    var userData
    try {
      userData = await ally.driver(provider).getUser()
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error
      })
      return response.redirect('/')
    }

    try {
      const authUser = await User.query()
        .where({
          provider: provider,
          provider_id: userData.getId()
        })
        .first()
      if (!(authUser === null)) {
        await auth.loginViaId(authUser.id)
        const connections = new ConnectionController()
        connections.master_controller({ auth })
        const onlineQueryResponse = await Database.from('users').where('status', 'online').count()
        const onlineUsers = onlineQueryResponse[0]['count(*)']
        if (onlineUsers < 10) await ChatRepository.publishOnMainChannel(`Welcome ${authUser.alias} !!`)
        return response.redirect('/')
      } else {
        session.put('provider', 'google')
        session.put('provider_id', userData.getId())
        // var alias = userData.getName()
        // alias = alias.replace(' ', '')
        // session.put('alias', alias)
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
        message: (error && error.message) || error
      })
      return response.redirect('/auth/' + provider)
    }
  }
}

module.exports = LoginController
