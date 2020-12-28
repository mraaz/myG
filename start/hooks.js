'use strict'
const { hooks } = require('@adonisjs/ignitor')
const setupBull = require('../app/Common/bull')
const NatsChatRepository = require('../app/Repositories/NatsChat')

hooks.after.providersBooted(() => {
  const Env = use('Env')
  const View = use('View')

  View.global('recaptcha_sitekey', function () {
    return Env.get('SITE_KEY')
  })

  const isNatsEnabled = Env.get('NATS_ENABLED')
  if (isNatsEnabled) {
    const natsServer = Env.get('NATS_SERVER')
    NatsChatRepository.subscribe(natsServer)
  }
})

hooks.after.httpServer(() => {
  setupBull()
})
