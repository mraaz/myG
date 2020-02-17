'use strict'

const { validate, sanitize } = use('Validator')
const User = use('App/Models/User')
const Settings = use('App/Models/Setting')
var nodemailer = require('nodemailer')

class CommonSaveController {
  async register({ view, session }) {
    console.log(session.get('email'))
    return view.render('auth/socialRegister', {
      alias: session.get('alias'),
      email: session.get('email'),
    })
  }

  async saveuser({ ally, auth, request, session, response, view }) {
    const rules = {
      alias: 'required|unique:users,alias|min:4',
      email: 'required|email|unique:users',
      firstName: 'required',
      lastName: 'required',
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      console.log('validation False')
      session.withErrors(validation.messages())
      return response.redirect('back')
    } else {
      console.log('validation True')
      console.log(request.input('alias'));

      if (/['/.%#$;`\\]/.test(request.input('alias'))) {
        session.withErrors("Alias has invalid characters")
        return response.redirect('back')
      }

      const user = new User()
      user.first_name = request.input('firstName')
      user.last_name = request.input('lastName')
      user.alias = request.input('alias')
      user.email = request.input('email')
      user.provider_id = session.get('provider_id')
      user.profile_img = session.get('profile_img')
      user.profile_bg = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg'
      user.provider = session.get('provider')
      await user.save()

      // await Mail.send('emails.welcome', user.toJSON(), (message) => {
      //   message
      //     .to(user.email)
      //     .from('admin@mygame.com')
      //     .subject('Welcome to My Game')
      // })

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use TLS
        auth: {
          user: 'teamraaz@gmail.com',
          pass: 'Raaz1988!',
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      })

      const mailOptions = {
        from: 'teamraaz@gmail.com', // sender address
        to: request.input('email'), // list of receivers
        subject: 'My Game Welcome Email', // Subject line
        html:
          '<h1>Hello,' +
          request.input('firstName') +
          ' ' +
          request.input('lastName') +
          ' .</h1><p>Welcome to the My Game, here is your getting started guide</p>',
      }

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err)
        else console.log(info)
      })

      session.forget('provider')
      session.forget('provider_id')
      await auth.loginViaId(user.id)
      return response.redirect('/')
    }
  }

  async sampleemailsend({ view, session }) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: 'teamraaz@gmail.com',
        pass: 'Password123!123',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })

    const mailOptions = {
      from: 'teamraaz@gmail.com', // sender address
      to: 'mnraaz@gmail.com', // list of receivers
      subject: 'test mail', // Subject line
      html: '<h1>this is a test mail.</h1>', // plain text body
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) console.log(err)
      else console.log(info)
    })
  }
}

module.exports = CommonSaveController
