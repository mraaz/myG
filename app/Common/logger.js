
const ALLOWED_LOGS = [];
// const ALLOWED_LOGS = ['USER', 'CHAT', 'GUEST', 'GAME', 'CRON'];

function log(context, args) {
  if (ALLOWED_LOGS.includes(context)) {
    if (context === 'USER') console.log('\x1b[34m', context, args, '\x1b[0m');
    if (context === 'CHAT') console.log('\x1b[33m', context, args, '\x1b[0m');
    if (context === 'GUEST') console.log('\x1b[36m', context, args, '\x1b[0m');
    if (context === 'GAME') console.log('\x1b[37m', context, args, '\x1b[0m');
    if (context === 'CRON') console.log('\x1b[35m', context, args, '\x1b[0m');
  }
}

module.exports = { log };