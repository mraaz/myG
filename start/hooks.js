'use strict'
const { hooks } = require('@adonisjs/ignitor')
const { scheduleAutomaticGameMessages, scheduleEmails } = require('../app/Common/scheduler')

hooks.after.providersBooted(() => {
  const Env = use('Env')
  const View = use('View')

  View.global('recaptcha_sitekey', function() {
    return Env.get('SITE_KEY')
  })
})

hooks.after.httpServer(() => {
  scheduleAutomaticGameMessages()
})

hooks.after.httpServer(() => {
  scheduleEmails()
})
