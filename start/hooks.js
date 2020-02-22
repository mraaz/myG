'use strict'
const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Env = use('Env')
  const View = use('View')

  View.global('recaptcha_sitekey', function () {
    return Env.get('SITE_KEY')
  })
})
