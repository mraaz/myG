'use strict'

//https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770
//https://discordjs.guide/oauth2/#oauth2-flows

const User = use('App/Models/User')
const Database = use('Database')
const fetch = require('node-fetch')
const FormData = require('form-data')

const ConnectionController = use('./ConnectionController')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const ExtraSeatsCodesTran = use('App/Models/ExtraSeatsCodesTran')
const ChatRepository = require('../../Repositories/Chat')
const EncryptionRepository = require('../../Repositories/Encryption')
const LoggingRepository = require('../../Repositories/Logging')

class DiscordLoginController {
  async redirect({ ally, response }) {
    return response.redirect(
      //'https://discordapp.com/api/oauth2/authorize?client_id=588326792289320962&redirect_uri=https://myg.gg/authenticated%2Fdiscord&response_type=code&scope=email%20identify'
      'https://discord.com/api/oauth2/authorize?client_id=588326792289320962&redirect_uri=https%3A%2F%2Fmyg.gg%2Fauthenticated%2Fdiscord&response_type=code&scope=identify%20email'
    )
  }

  async callback({ auth, response, request, session }) {
    var all = request.all()
    var CLIENT_ID = '588326792289320962'
    var CLIENT_SECRET = 'wr47LZpqEoVUd2AEusSqTNWxWfJZFW9r'
    var REDIRECT_URI = 'https://myg.gg/authenticated/discord'

    var redirect = 'https://myg.gg/finalauthenticated/discord'
    const code = all.code
    const token = all.token
    if (code) {
      const data = new FormData()

      data.append('client_id', CLIENT_ID)
      data.append('client_secret', CLIENT_SECRET)
      data.append('grant_type', 'authorization_code')
      data.append('redirect_uri', REDIRECT_URI)
      data.append('scope', 'identify email')
      data.append('code', code)

      const res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: data,
      })

      const json = await res.json()
      return response.redirect(`https://myg.gg/authenticated/discord/?token=${json.access_token}`)
    } else if (token) {
      const res = await fetch(`https://discord.com/api/users/@me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await res.json()
      try {
        const authUser = await User.query()
          .where({
            provider: 'discord',
            provider_id: json.id,
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
          session.put('provider', 'discord')
          session.put('provider_id', json.id)
          session.put('email', json.email)
          session.put('profile_img', '//cdn.discordapp.com/avatars/' + json.id + '/' + json.avatar + '.png')
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
        return response.redirect('/login/discord')
      }
    }
  }

  async finalcallback({ ally, response, request }) {
    const all = request.all()
    console.log(all)

    const provider = 'discord'
    try {
      const Requestcurl = use('Request')
      const result = Requestcurl.get('https://discord.com/api/oauth2/users/@me')
      console.log(result)

      const userData = await ally.driver(provider).getUser()

      const authUser = await User.query()
        .where({
          provider: provider,
          provider_id: userData.getId(),
        })
        .first()
      if (!(authUser === null)) {
        await auth.loginViaId(authUser.id)
        return response.redirect('/')
      }

      // Seats Availability
      const seatsAvailable = await SeatsAvailable.query().first()
      const extraSeatsCode = request.input('extraSeatsCode')
      const unlockedByCheatCode = request.input('unlockedByCheatCode')
      if (!seatsAvailable.seats_available && !extraSeatsCode && !unlockedByCheatCode) {
        return response.redirect('/?error=seats')
      }

      const user = new User()
      user.first_name = await EncryptionRepository.encryptField(userData.getName())
      user.email = await EncryptionRepository.encryptField(userData.getEmail())
      var alias = userData.getName()
      alias = alias.replace(' ', '')
      user.alias = alias
      user.provider_id = userData.getId()
      user.profile_img = userData.getAvatar()
      user.provider = provider

      await user.save()

      // Decrease Seats Available upon Registration
      if (seatsAvailable.seats_available > 0) {
        seatsAvailable.seats_available = (seatsAvailable.seats_available || 1) - 1
        seatsAvailable.save()
      }

      // Mark Extra Seat Code as Used
      if (extraSeatsCode) {
        const extraSeatsCodes = await ExtraSeatsCodes.query()
          .where('code', extraSeatsCode)
          .first()

        if (extraSeatsCodes != undefined) {
          await ExtraSeatsCodes.query()
            .where('code', extraSeatsCode)
            .increment('counter', 1)

          if (extraSeatsCodes.id) {
            await ExtraSeatsCodesTran.create({
              extra_seats_codes_id: extraSeatsCodes.id,
              user_id: user.id,
            })
          }
        }
      }

      await auth.loginViaId(user.id)
      return response.redirect('/')
    } catch (e) {
      console.log(e)
      return response.redirect('/auth/' + provider)
    }
  }
}

module.exports = DiscordLoginController
