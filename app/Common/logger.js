function log(context, args) {
  const Env = use('Env')
  if ((Env.get('LOGS_ON') || []).includes(context)) {
    if (context === 'NATS') console.log('\x1b[32m', context, args, '\x1b[0m')
    if (context === 'USER') console.log('\x1b[34m', context, args, '\x1b[0m')
    if (context === 'CHAT') console.log('\x1b[33m', context, args, '\x1b[0m')
    if (context === 'GUEST') console.log('\x1b[36m', context, args, '\x1b[0m')
    if (context === 'GAME') console.log('\x1b[37m', context, args, '\x1b[0m')
    if (context === 'CRON') console.log('\x1b[35m', context, args, '\x1b[0m')
    if (context === 'PROFILE') console.log('\x1b[31m', context, args, '\x1b[0m')
    if (context === 'ELASTICSEARCH') console.log('\x1b[38m', context, args, '\x1b[0m')
  }
}

module.exports = { log }
