module.exports = async (job) => {
  const moment = require('moment')();
  if (process.env.SCHEDULER_LOGS) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Started execution for ${job.name}`, '\x1b[0m');;
  const guardExecution = require('./execution-guard')
  await guardExecution(job.name);
  const PostController = require('../../../Controllers/Http/PostController')
  await new PostController().shuffle_sponsored_posts(job)
  if (process.env.SCHEDULER_LOGS) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Finished execution for ${job.name}`, '\x1b[0m');
}