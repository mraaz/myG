const cron = require('node-cron')

function scheduleAutomaticGameMessages() {
  const ChatRepository = require('../Repositories/Chat')
  cron.schedule('* * * * *', () => ChatRepository.handleGameMessages())
}

function scheduleEmails() {
  const EmailController = require('../Controllers/Http/EmailController')
  let email = new EmailController()

  // cron.schedule('1 * * * * *', () => email.dailyEmails())
  // cron.schedule('* 0 18 * * *', () => email.dailyEmails())
  // cron.schedule('* 0 19 * * 5', () => email.weeklyEmails())
}

module.exports = {
  scheduleAutomaticGameMessages,
  scheduleEmails,
}
