'use strict'

const { validate } = use('Validator')
const Hash = use('Hash')
const Database = use('Database')
const User = use('App/Models/User')
const Settings = use('App/Models/Setting')
const SeatsAvailable = use('App/Models/SeatsAvailable')
const ExtraSeatsCodes = use('App/Models/ExtraSeatsCodes')
const ExtraSeatsCodesTran = use('App/Models/ExtraSeatsCodesTran')

const ConnectionController = use('./ConnectionController')

const ChatRepository = require('../../Repositories/Chat')
const EncryptionRepository = require('../../Repositories/Encryption')
const LoggingRepository = require('../../Repositories/Logging')

class AuthController {
  async register({ response, request, view }) {
    return view.render('auth/register')
  }

  //Validation Rules
  async storeUser({ request, session, response, auth, view }) {
    if (auth.user != null) {
      session.put('alias', null)
      session.put('email', null)
      session.put('profile_img', null)
      session.put('provider', null)
      session.put('provider_id', null)
      await auth.logout()
    }

    // if (session.get('provider_id') == null) {
    //   console.log('Security Error! Unable to authenticate against your social.')
    //   session
    //     .withErrors([
    //       { field: 'alias', message: 'Security Error! Unable to authenticate against your social. Please clear cache and try again.' },
    //     ])
    //     .flashAll()
    //   return response.redirect('back')
    // }

    const rules = {
      alias: 'required|unique:users,alias|min:4|max:30',
      email: 'required|email|unique:users|min:3|max:320',
      password: 'required|min:6|max:40',
      confirm_password: 'required',
      encryption: 'required|min:7|max:30',
      firstName: 'required',
      lastName: 'required',
    }

    const messages = {
      required: 'Required field',
      email: 'Enter valid email address',
      min: 'Not enough characters - Minimum 4 for Alias & 7 for Chat Password',
      max: 'Wow! Too many characters - Max 30',
      unique: 'Sorry, this field is not unique. Try again please.',
    }

    const validation = await validate(request.all(), rules, messages)
    if (validation.fails()) {
      console.log(validation.messages())
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    } else {
      var strMsg =
        'Special characters:\r\nAlias can only contain letters (a-z), numbers (0-9), and periods (.).\r\nAlias can begin or end with non-alphanumeric characters except periods (.) and they can not have multiple periods.'

      try {
        if (request.input('alias').charAt(0) == '.' || request.input('alias').charAt(request.input('alias').length - 1) == '.') {
          session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
          return response.redirect('back')
        }

        if (/[' *(){}\[\]/%#|+^$?:;_`~=&-+,<>\\]/.test(request.input('alias'))) {
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
          message: (error && error.message) || error,
        })
        session.withErrors(validation.messages()).flashAll()
        return response.redirect('back')
      }

      try {
        // Seats Availability
        const seatsAvailable = await SeatsAvailable.query().first()
        const extraSeatsCode = request.input('extraSeatsCode')
        const unlockedByCheatCode = request.input('unlockedByCheatCode')
        if (!seatsAvailable.seats_available && !extraSeatsCode && !unlockedByCheatCode) {
          return response.redirect('/?error=seats')
        }

        const newUser = await User.create({
          email: await EncryptionRepository.encryptField(request.input('email')),
          first_name: await EncryptionRepository.encryptField(request.input('firstName')),
          last_name: await EncryptionRepository.encryptField(request.input('lastName')),
          password: request.input('password'),
          alias: request.input('alias'),
          profile_img: 'https://myG.gg/default_user/new-user-profile-picture.png',
        })

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

        var newUserSettings = await Settings.create({
          user_id: newUser.id,
        })
      } catch (error) {
        console.log('error')
        session
          .withErrors([
            {
              field: 'alias',
              message: 'Opps, there was an error with the Database, please try again later',
            },
          ])

          .flashExcept(['password'])

        return response.redirect('back')
      }
      //session.flash({ notification: 'Welcome to myGame!!!' })

      const fallbackUser = async () => await User.query()
        .where('email', request.input('email'))
        .first()

      const user = await User.query()
        .where('email', await EncryptionRepository.encryptField(request.input('email')))
        .first()

      await auth.login(user || await fallbackUser())

      return response.redirect(`/setEncryptionParaphrase/${request.input('encryption')}`)
    }
    // } else {
    //   session
    //     .withErrors([
    //       { field: 'password', message: 'Need to confirm password' },
    //       { field: 'confirm_password', message: 'Need to confirm password' },
    //     ])
    //
    //     .flashExcept(['password'])
    //
    //   return response.redirect('back')
    // }
  }

  async login({ response, request, view }) {
    return view.render('auth/login')
  }
  async loginUser({ response, request, view, auth, session }) {
    // capture the data from the form
    const postData = request.post()

    //find the user in the Database by their Email
    const user = await User.query()
      .where('email', postData.email)
      .first()
    if (user) {
      //Verfiy the Password
      const passwordVerified = await Hash.verify(postData.password, user.password)

      if (passwordVerified) {
        // Login the user
        await auth.remember(true).login(user)
        //session.flash({ notification: 'Welcome back!!!' })
        const connections = new ConnectionController()
        connections.master_controller({ auth })

        const onlineQueryResponse = await Database.from('users').where('status', 'online').count();
        const onlineUsers = onlineQueryResponse[0]['count(*)'];
        if (onlineUsers < 10) await ChatRepository.publishOnMainChannel(`Welcome ${user.alias} !!`);

        return response.redirect('/')
      } else {
        session
          .withErrors([
            {
              field: 'password',
              message: 'Opps, Incorrect Password',
            },
          ])

          .flashExcept(['password'])

        return response.redirect('back')
      }
    } else {
      // Can not find user with that email
      session
        .withErrors([
          {
            field: 'email',
            message: 'Sorry, can not find user with that email',
          },
        ])

        .flashExcept(['password'])

      return response.redirect('back')
    }
  }

  async forgotPassword({ response, request, view }) {
    return view.render('auth/forgotPassword')
  }
  async logout({ response, request, view, auth, session }) {
    try {
      session.put('alias', null)
      session.put('email', null)
      session.put('profile_img', null)
      session.put('provider', null)
      session.put('provider_id', null)
      session.clear()
      await auth.logout()
      return response.redirect('/')
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
      return 'Error, unable to logout'
    }
  }
  async changepwd({ response, request, view }) {
    return view.render('auth/changepwd')
  }

  //async updatepwd({ response, request, view, auth, session }) {
  // const rules = {
  //   currpassword: 'required|min:6|max:40',
  //   password: 'required|min:6|max:40',
  //   confirm_password: 'required',
  // }
  //
  // const validation = await validate(request.all(), rules)
  // if (request.input('password') == request.input('confirm_password')) {
  //   if (validation.fails()) {
  //     session.withErrors(validation.messages()).flashExcept(['password'])
  //
  //     return response.redirect('back')
  //   } else {
  //     const postData = request.post()
  //     const passwordVerified = await Hash.verify(postData.currpassword, auth.user.password)
  //
  //     if (passwordVerified) {
  //       try {
  //         auth.user.password = await Hash.make(request.input('password'))
  //         var updateUser = await User.query()
  //           .where('id', '=', auth.user.id)
  //           .update({ password: auth.user.password })
  //         session.flash({ notification: 'Password Updated' })
  //         return response.redirect('/')
  //       } catch (error) {
  //         console.log('error')
  //         session
  //           .withErrors([
  //             {
  //               field: 'alias',
  //               message: 'Opps, there was an error with the Database, please try again later',
  //             },
  //           ])
  //
  //           .flashExcept(['password'])
  //
  //         return response.redirect('back')
  //       }
  //     } else {
  //       session
  //         .withErrors([
  //           {
  //             field: 'currpassword',
  //             message: 'Opps, Incorrect Password',
  //           },
  //         ])
  //
  //         .flashExcept(['password'])
  //
  //       return response.redirect('back')
  //     }
  //
  //     return response.redirect('/')
  //   }
  // } else {
  //   session
  //     .withErrors([
  //       { field: 'password', message: 'Need to confirm password' },
  //       { field: 'confirm_password', message: 'Need to confirm password' },
  //     ])
  //
  //     .flashExcept(['password'])
  //
  //   return response.redirect('back')
  // }
  //  return response.redirect('/')
  //} //updatepwd
}

module.exports = AuthController
