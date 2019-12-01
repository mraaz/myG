'use strict'

const User = use('App/Models/User')

class FacebookLoginController {
  async redirect({ ally }) {
    await ally.driver('facebook').redirect()
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
          return response.redirect('/')
        } else {
          session.put('provider', 'facebook')
          session.put('provider_id', userData.getId())
          var alias = userData.getName()
          alias = alias.replace(' ', '')
          session.put('alias', alias)
          session.put('email', userData.getEmail())
          session.put('profile_img', userData.getAvatar())
          return response.redirect('/user/register')
        }
      } catch (e) {
        console.log(e)
        return response.redirect('/auth/' + provider)
      }
    }
  }
}

module.exports = FacebookLoginController
