function log(context, ...args) {
  if ((window.LOGS_ON || []).includes(context)) console.log(...args)
}

export default {
  log
}
