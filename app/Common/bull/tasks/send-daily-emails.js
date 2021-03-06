module.exports = (job, done) => {
  const EmailController = require('../../../Controllers/Http/EmailController')
  new EmailController().dailyEmails(job).then(done)
}
