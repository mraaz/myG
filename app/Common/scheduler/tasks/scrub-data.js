module.exports = async (job) => {
  const moment = require('moment')()
  if (process.env.SCHEDULER_LOGS)
    console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Started execution for ${job.name}`, '\x1b[0m')
  const UserController = require('../../../Controllers/Http/UserController')
  // await new UserController().scrub_data(job)
  if (process.env.SCHEDULER_LOGS)
    console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Finished execution for ${job.name}`, '\x1b[0m')
}
