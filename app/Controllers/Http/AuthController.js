'use strict'
const { validate, sanitize } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')
const Settings = use('App/Models/Setting')

class AuthController {
  async register({ response, request, view }) {
    return view.render('auth/register')
  }

  //Validation Rules
  async storeUser({ request, session, response, auth, view }) {
    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required|min:6|max:40',
      confirm_password: 'required',
      alias: 'unique:users,alias|min:4',
      firstName: 'required',
      lastName: 'required',
    }

    const validation = await validate(request.all(), rules)

    //Check if Password Match
    if (request.input('password') == request.input('confirm_password')) {
      if (validation.fails()) {
        session.withErrors(validation.messages()).flashExcept(['password'])

        return response.redirect('back')
      } else {
        var newUser
        try {
          newUser = await User.create({
            email: request.input('email'),
            password: request.input('password'),
            alias: request.input('alias'),
            first_name: request.input('firstName'),
            last_name: request.input('lastName'),
            profile_img:
              'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
            profile_bg:
              'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg',
          })

          var newUserSettings = await Settings.create({
            user_id: newUser.id,
          })
        } catch (error) {
          console.log('error')
          session
            .withErrors([
              {
                field: 'alias',
                message:
                  'Opps, there was an error with the Database, please try again later',
              },
            ])

            .flashExcept(['password'])

          return response.redirect('back')
        }
        session.flash({ notification: 'Welcome to myGame!!!' })

        const user = await User.query()
          .where('email', request.input('email'))
          .first()
        await auth.login(user)

        return response.redirect('/')
      }
    } else {
      session
        .withErrors([
          { field: 'password', message: 'Need to confirm password' },
          { field: 'confirm_password', message: 'Need to confirm password' },
        ])

        .flashExcept(['password'])

      return response.redirect('back')
    }
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
      const passwordVerified = await Hash.verify(
        postData.password,
        user.password
      )

      if (passwordVerified) {
        // Login the user
        await auth.remember(true).login(user)
        session.flash({ notification: 'Welcome back!!!' })
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
  async logout({ response, request, view, auth }) {
    try {
      await auth.logout()
      return response.redirect('/')
    } catch (error) {
      console.log(error)
      return 'Error, unable to logout'
    }
  }
  async changepwd({ response, request, view }) {
    return view.render('auth/changepwd')
  }

  async updatepwd({ response, request, view, auth, session }) {
    const rules = {
      currpassword: 'required|min:6|max:40',
      password: 'required|min:6|max:40',
      confirm_password: 'required',
    }

    const validation = await validate(request.all(), rules)
    if (request.input('password') == request.input('confirm_password')) {
      if (validation.fails()) {
        session.withErrors(validation.messages()).flashExcept(['password'])

        return response.redirect('back')
      } else {
        const postData = request.post()
        const passwordVerified = await Hash.verify(
          postData.currpassword,
          auth.user.password
        )

        if (passwordVerified) {
          try {
            auth.user.password = await Hash.make(request.input('password'))
            var updateUser = await User.query()
              .where('id', '=', auth.user.id)
              .update({ password: auth.user.password })
            session.flash({ notification: 'Password Updated' })
            return response.redirect('/')
          } catch (error) {
            console.log('error')
            session
              .withErrors([
                {
                  field: 'alias',
                  message:
                    'Opps, there was an error with the Database, please try again later',
                },
              ])

              .flashExcept(['password'])

            return response.redirect('back')
          }
        } else {
          session
            .withErrors([
              {
                field: 'currpassword',
                message: 'Opps, Incorrect Password',
              },
            ])

            .flashExcept(['password'])

          return response.redirect('back')
        }

        return response.redirect('/')
      }
    } else {
      session
        .withErrors([
          { field: 'password', message: 'Need to confirm password' },
          { field: 'confirm_password', message: 'Need to confirm password' },
        ])

        .flashExcept(['password'])

      return response.redirect('back')
    }
    return response.redirect('/')
  } //updatepwd
}

module.exports = AuthController
