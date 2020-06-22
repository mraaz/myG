'use strict'

//https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770

const User = use('App/Models/User')
const fetch = require('node-fetch')
const ConnectionController = use('./ConnectionController')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')

class DiscordLoginController {
  async redirect({ ally, response }) {
    return response.redirect(
      //'https://discordapp.com/api/oauth2/authorize?client_id=588326792289320962&redirect_uri=https://myg.gg/authenticated%2Fdiscord&response_type=code&scope=email%20identify'
      'https://discord.com/api/oauth2/authorize?client_id=588326792289320962&redirect_uri=https%3A%2F%2Fmyg.gg%2Fauthenticated%2Fdiscord&response_type=code&scope=identify%20email'
    )
  }

  async callback({ auth, response, request, session }) {
    var all = request.all()
    var API_ENDPOINT = 'https://discord.com/api/v6'
    var CLIENT_ID = '588326792289320962'
    var CLIENT_SECRET = 'wr47LZpqEoVUd2AEusSqTNWxWfJZFW9r'
    var REDIRECT_URI = 'https://myg.gg/authenticated/discord'

    var redirect = 'https://myg.gg/finalauthenticated/discord'
    const code = all.code
    const token = all.token
    if (code) {
      console.log('Going into CODE <<<<<<<<<<<<<<<')
      var data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify email connections',
      }
      //const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      //Instead of using btoa we've manually encoded this Base64
      const creds = 'NTg4MzI2NzkyMjg5MzIwOTYyOndyNDdMWnBxRW9WVWQyQUV1c1NxVE5XeFdmSlpGVzly'

      // const res = await fetch(
      //   `https://discord.com/api/v6/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=https://myg.gg/authenticated/discord`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Basic ${creds}`,
      //     },
      //   }
      // )
      const res = await fetch(`https://discord.com/api/v6/oauth2/token?${data}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      //const res = await fetch('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)

      const json = await res.json()
      console.log(json)
      return response.redirect(`https://myg.gg/authenticated/discord/?token=${json.access_token}`)
    } else if (token) {
      const res = await fetch(`https://discordapp.com/api/users/@me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await res.json()
      console.log('Raaz')
      console.log(json)
      try {
        const authUser = await User.query()
          .where({
            provider: 'discord',
            provider_id: json.id,
          })
          .first()
        if (!(authUser === null)) {
          await auth.loginViaId(authUser.id)
          let connections = new ConnectionController()
          connections.master_controller({ auth })
          return response.redirect('/')
        } else {
          session.put('provider', 'discord')
          session.put('provider_id', json.id)
          //session.put('alias', json.username)
          session.put('email', json.email)
          session.put('profile_img', '//cdn.discordapp.com/avatars/' + json.id + '/' + json.avatar + '.png')
          return response.redirect('/user/register')
        }

        // const user = new User()
        // user.first_name = json.username
        // user.alias = json.username
        // user.email = json.email
        // user.provider_id = json.id
        // user.profile_img = '//cdn.discordapp.com/avatars/'+json.id+'/'+json.avatar+'.png'
        // user.provider = 'discord'

        // await user.save()

        // await auth.loginViaId(user.id)
        // return response.redirect('/')
      } catch (e) {
        console.log(e)
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
      const result = Requestcurl.get('https://discordapp.com/api/oauth2/users/@me')
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
      if (!seatsAvailable.seats_available && !extraSeatsCode) {
        return response.redirect('/?error=seats')
      }

      const user = new User()
      user.first_name = userData.getName()
      var alias = userData.getName()
      alias = alias.replace(' ', '')
      user.alias = alias
      user.email = userData.getEmail()
      user.provider_id = userData.getId()
      user.profile_img = userData.getAvatar()
      user.provider = provider

      await user.save()

      // Decrease Seats Available upon Registration
      seatsAvailable.seats_available = (seatsAvailable.seats_available || 1) - 1
      seatsAvailable.save()

      // Mark Extra Seat Code as Used
      if (extraSeatsCode) {
        await ExtraSeatsCodes.query()
          .where('code', extraSeatsCode)
          .update({ user_id: newUser.id })
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
