module.exports = (job, done) => {
  const ChatRepository = require('../../../Repositories/Chat')
  ChatRepository.handleExpiredAttachments(job).then(done);
}
