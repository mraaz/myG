
const ALLOWED_LOGS = [];

function log(context, ...args) {
  if (ALLOWED_LOGS.includes(context)) console.log(args);
}

export default {
  log,
}