module.exports = async (job) => {
  const moment = require('moment')();
  if (process.env.SCHEDULER_LOGS) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Started execution for ${job.name}`, '\x1b[0m');;
  const { lockJob, unlockJob } = require('./execution-guard')
  const lock = await lockJob(job.name);
  const PostController = require('../../../Controllers/Http/PostController')
  await new PostController().shuffle_sponsored_posts(job)
  await unlockJob(job.name, lock);
  if (process.env.SCHEDULER_LOGS) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', `Finished execution for ${job.name}`, '\x1b[0m');
}
