module.exports = (job, done) => {
  const ChatRepository = require('../../../Repositories/Chat')
  ChatRepository.handleGameMessages(job).then(done);
}
