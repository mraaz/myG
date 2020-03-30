
// const ALLOWED_LOGS = [];
const ALLOWED_LOGS = ['USER', 'CHAT', 'GUEST', 'CRON'];

function log(context, args) {
  if (ALLOWED_LOGS.includes(context)) console.log(args);
}

module.exports = { log };