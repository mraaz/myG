module.exports = (job, done) => {
  const EmailController = require('../../../Controllers/Http/EmailController')
  new EmailController().weeklyEmails(job).then(done)
}
