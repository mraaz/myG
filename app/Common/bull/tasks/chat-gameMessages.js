module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const ChatRepository = require('../../../Repositories/Chat')
  ChatRepository.handleGameMessages(job).then(done);
}
