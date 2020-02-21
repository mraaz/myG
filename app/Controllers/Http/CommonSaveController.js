'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Settings = use('App/Models/Setting')
var nodemailer = require('nodemailer')
const axios = use('axios')
const querystring = use('querystring')

class CommonSaveController {
  async register({ view, session }) {
    console.log(session.get('email'))
    return view.render('auth/socialRegister', {
      alias: session.get('alias'),
      email: session.get('email'),
    })
  }

  async saveuser({ ally, auth, request, session, response, view }) {
    //117703502811656157640
    //https://myg.gg/user/register#

    if (auth.user != null) {
      session.put('alias', null)
      session.put('email', null)
      session.put('profile_img', null)
      session.put('provider', null)
      session.put('provider_id', null)
      await auth.logout()
    }

    if (session.get('provider_id') == null) {
      console.log('Security Error! Unable to authenticate against your social.')
      session
        .withErrors([
          { field: 'alias', message: 'Security Error! Unable to authenticate against your social. Please clear cache and try again.' },
        ])
        .flashAll()
      return response.redirect('back')
    }

    const rules = {
      alias: 'required|unique:users,alias|min:4|max:30',
      email: 'required|email|unique:users',
      firstName: 'required',
      lastName: 'required',
    }

    const messages = {
      required: 'Required field',
      email: 'Enter valid email address',
      min: 'Not enough characters for Alias- Min 4',
      max: 'Wow! Too many characters for Alias - Max 30',
      unique: 'Sorry, this field is not unique. Try again please.',
    }

    const validation = await validate(request.all(), rules, messages)
    var tmp
    if (validation.fails()) {
      console.log(validation.messages())
      var tmp = validation.messages()

      switch (tmp[0].validation) {
        case 'unique':
          var newMsg = 'Sorry, ' + tmp[0].field + '  is not unique. Please try again.'
          session.withErrors([{ field: 'alias', message: newMsg }]).flashAll()
          return response.redirect('back')
          break
        case 'required':
          var newMsg = 'Sorry, ' + tmp[0].field + '  is required. Please try again.'
          session.withErrors([{ field: 'alias', message: newMsg }]).flashAll()
          return response.redirect('back')
          break
        default:
          session.withErrors(validation.messages()).flashAll()
          return response.redirect('back')
      }
    } else {
      var strMsg =
        "Special characters:\r\nAlias can contain letters (a-z), numbers (0-9), and periods (.).\r\nAlias cannot contain an ampersand (&), equals sign (=), underscore (_), apostrophe ('), dash (-), plus sign (+), comma (,), brackets (<,>), backtick (`), dollar sign ($), single and double quotes (') (\"). Alias can begin or end with non-alphanumeric characters except periods (.)."

      try {
        if (request.input('alias').charAt(0) == '.' || request.input('alias').includes('_')) {
          session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
          return response.redirect('back')
        }

        if (/[' /.%#$;`=&-+,<>\\]/.test(request.input('alias'))) {
          session.withErrors([{ field: 'alias', message: strMsg }]).flashAll()
          return response.redirect('back')
        }
      } catch (error) {
        console.log(error)
        session.withErrors(validation.messages()).flashAll()
        return response.redirect('back')
      }

      // await Mail.send('emails.welcome', user.toJSON(), (message) => {
      //   message
      //     .to(user.email)
      //     .from('admin@mygame.com')
      //     .subject('Welcome to My Game')
      // })
      const token = request.input('g-recaptcha-response')
      const secretKey = '6LcQ89oUAAAAANbH8jJfsuII9ciMYAoFLxlkS2R5'
      console.log(token)
      const data_request = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        querystring.stringify({ secret: secretKey, response: token })
      )
      if (!data_request.data.success) {
        console.log('Google Recaptcha Verification Fail' + data_request.data)
        return response.redirect('/')
      } else {
        console.log('Google Recaptcha Verification Success' + data_request.data)
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
      }

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
