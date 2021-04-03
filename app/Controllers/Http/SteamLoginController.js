'use strict'

const User = use('App/Models/User')
const ConnectionController = use('./ConnectionController')
const ChatRepository = require('../../Repositories/Chat')

const fetch = require('node-fetch')
class SteamLoginController {
  async redirect({ ally, response }) {
    return response.redirect(
      'https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=https://myg.gg/authenticated%2Fsteam&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select'
    )
  }

  async callback({ ally, auth, response, request, session }) {
    var all = request.all()
    if (all['openid.claimed_id']) {
      var all_data_arr = all['openid.claimed_id'].split('id/')
      if (all_data_arr[2]) {
        const res = await fetch(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=D79F9A74D6438202D12060A9819ED956&steamids=` + all_data_arr[2],
          {
            method: 'GET',
          }
        )
        const json = await res.json()
        if (json.response.players[0].steamid) {
          const authUser = await User.query()
            .where({
              provider: 'steam',
              provider_id: json.response.players[0].steamid,
            })
            .first()
          if (!(authUser === null)) {
            await auth.loginViaId(authUser.id)
            const connections = new ConnectionController()
            connections.master_controller({ auth })
            const onlineQueryResponse = await Database.from('users').where('status', 'online').count();
            const onlineUsers = onlineQueryResponse[0]['count(*)'];
            if (onlineUsers < 10) await ChatRepository.publishOnMainChannel(`Welcome ${user.alias} !!`);
            return response.redirect('/')
          } else {
            session.put('provider', 'steam')
            session.put('provider_id', json.response.players[0].steamid)
            session.put('email', '')
            session.put('profile_img', json.response.players[0].avatar)
            return response.redirect('/user/register')
          }
        } else {
          return response.redirect('/')
        }
      } else {
        return response.redirect('/')
      }
    }
  }
}

module.exports = SteamLoginController
