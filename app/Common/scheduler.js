
const cron = require('node-cron');

function scheduleAutomaticGameMessages() {
  const ChatRepository = require('../Repositories/Chat');
  cron.schedule('* * * * *', () => ChatRepository.handleGameMessages());
}

module.exports = {
  scheduleAutomaticGameMessages,
}