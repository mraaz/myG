
// const ALLOWED_LOGS = [];
const ALLOWED_LOGS = ['USER', 'CHAT', 'GUEST'];

function log(context, args) {
  if (ALLOWED_LOGS.includes(context)) console.log(args);
}

module.exports = { log };