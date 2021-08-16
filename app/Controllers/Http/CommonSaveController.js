'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
// const SeatsAvailable = use('App/Models/SeatsAvailable')
// const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
// const ExtraSeatsCodesTran = use('App/Models/ExtraSeatsCodesTran')

const axios = use('axios')
const querystring = use('querystring')
const Env = use('Env')

const ChatRepository = require('../../Repositories/Chat')
const EncryptionRepository = require('../../Repositories/Encryption')
const ProfileRepository = require('../../Repositories/Profile')
const ElasticsearchRepository = require('../../Repositories/Elasticsearch')
const LoggingRepository = require('../../Repositories/Logging')
const ConnectionController = use('./ConnectionController')

class CommonSaveController {
  async register({ view, session }) {
    return view.render('auth/socialRegister', {
      alias: session.get('alias'),
      email: session.get('email')
    })
  }

  async saveuser({ auth, request, session, response }) {
    if (auth.user != null) {
      session.put('alias', null)
      session.put('email', null)
      session.put('profile_img', null)
      session.put('provider', null)
      session.put('provider_id', null)
      await auth.logout()
    }

    const rules = {
      alias: 'required|unique:users,alias|min:4|max:30',
      email: 'required|email|unique:users',
      encryption: 'required|min:7|max:30',
      firstName: 'required',
      lastName: 'required'
    }

    const messages = {
      required: 'Required field',
      email: 'Enter valid email address',
      min: 'Not enough characters - Minimum 4 for Alias & 7 for Chat Password',
      max: 'Wow! Too many characters - Max 30',
      unique: 'Sorry, this field is not unique. Try again please.'
    }

    const validation = await validate(request.all(), rules, messages)
    var tmp
    if (validation.fails()) {
      console.log(validation.messages())
      var tmp = validation.messages()

      switch (tmp[0].validation) {
        case 'unique':
          var newMsg = 'Sorry, ' + tmp[0].field + ' is not unique. Please try again.'
          session.withErrors([{ field: 'alias', message: newMsg }]).flashAll()
          return response.redirect('back')
        case 'required':
          var newMsg = 'Sorry, ' + tmp[0].field + ' is required. Please try again.'
          session.withErrors([{ field: 'alias', message: newMsg }]).flashAll()
          return response.redirect('back')
        default:
          session.withErrors(validation.messages()).flashAll()
          return response.redirect('back')
      }
    } else {
      var strMsg = 'Alias invalid!'
      try {
        if (request.input('alias').charAt(0) == '.' || request.input('alias').charAt(request.input('alias').length - 1) == '.') {
          session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
          return response.redirect('back')
        }

        if (/[' *(){}\[\]/%#|^+$?:;_`~=&-+,<>\\]/.test(request.input('alias'))) {
          session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
          return response.redirect('back')
        }

        var x = request.input('alias').toString()
        for (var i = 0; i < x.length; i++) {
          if (x.charCodeAt(i) > 122 || x.charCodeAt(i) < 46) {
            session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
            return response.redirect('back')
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
        session.withErrors(validation.messages()).flashAll()
        return response.redirect('back')
      }

      const token = request.input('g-recaptcha-response')
      const data_request = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        querystring.stringify({ secret: Env.get('SECRET_KEY'), response: token })
      )
      if (!data_request.data.success) {
        console.log('Google 1: ' + data_request.data.success)
        console.log('Google 2: ' + data_request)
        console.log('Google Recaptcha Verification Failed: ' + data_request.data)
        return response.redirect('/?error=google-recaptcha')
      } else {
        // Seats Availability
        // const seatsAvailable = await SeatsAvailable.query().first()
        // const extraSeatsCode = request.input('extraSeatsCode')
        // const unlockedByCheatCode = request.input('unlockedByCheatCode')
        // if (!seatsAvailable.seats_available && !extraSeatsCode && !unlockedByCheatCode) {
        //   return response.redirect('/?error=seats')
        // }

        const user = new User()
        user.first_name = await EncryptionRepository.encryptField(request.input('firstName'))
        user.last_name = await EncryptionRepository.encryptField(request.input('lastName'))
        user.alias = request.input('alias')
        user.email = await EncryptionRepository.encryptField(request.input('email'))
        user.provider_id = session.get('provider_id')
        user.profile_img = session.get('profile_img')
        user.provider = session.get('provider')
        await user.save()

        const { profile } = await ProfileRepository.fetchProfileInfo({ requestingUserId: user.id, id: user.id })
        await ElasticsearchRepository.storeUser({ user: profile })
        await ChatRepository.publishOnMainChannel(`Introducing a newcomer to myG... Please all welcome ${user.alias} !!`)

        // Decrease Seats Available upon Registration
        // if (seatsAvailable.seats_available > 0) {
        //   seatsAvailable.seats_available = (seatsAvailable.seats_available || 1) - 1
        //   seatsAvailable.save()
        // }

        // Mark Extra Seat Code as Used
        // if (extraSeatsCode) {
        //   const extraSeatsCodes = await ExtraSeatsCodes.query()
        //     .where('code', extraSeatsCode)
        //     .first()

        //   if (extraSeatsCodes != undefined) {
        //     await ExtraSeatsCodes.query()
        //       .where('code', extraSeatsCode)
        //       .increment('counter', 1)

        //     if (extraSeatsCodes.id) {
        //       await ExtraSeatsCodesTran.create({
        //         extra_seats_codes_id: extraSeatsCodes.id,
        //         user_id: user.id,
        //       })
        //     }
        //   }
        // }

        const connections = new ConnectionController()
        connections.master_controller({ auth })

        session.forget('provider')
        session.forget('provider_id')
        await auth.loginViaId(user.id)
        return response.redirect(
          `/setEncryptionParaphrase/${request.input('encryption')}?persist=${request.input('persist-password') === 'on'}`
        )
      }
    }
  }
}
module.exports = CommonSaveController
