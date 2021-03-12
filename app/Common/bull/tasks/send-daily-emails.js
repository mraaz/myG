module.exports = async (job, done) => {
  const guardExecution = require('./execution-guard');
  await guardExecution(job.queue.name, job.data.delay);
  const EmailController = require('../../../Controllers/Http/EmailController')
  await new EmailController().dailyEmails(job).then(done)
}
