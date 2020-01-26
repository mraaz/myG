
const ALLOWED_LOGS = [];
// const ALLOWED_LOGS = ['USER', 'CHAT'];

function log(context, ...args) {
  if (ALLOWED_LOGS.includes(context)) console.log(...args);
}

export default {
  log,
}