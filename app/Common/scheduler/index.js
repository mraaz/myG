function setupScheduler() {

  const Env = use('Env')
  const hasRedis = Env.get('REDIS_ENABLED');
  if (!hasRedis) return logScheduler(schedulerLogs, moment, 'Redis Disabled, no Scheduler Queues will be run.');

  const cron = require('node-cron')
  const moment = require('moment')();
  const schedulerLogs = Env.get('SCHEDULER_LOGS');
  const runEveryJobOnStart = Env.get('SCHEDULER_RUN_EVERY_JOB_ON_START') == 'true' ? true : false;

  getJobs(runEveryJobOnStart).forEach((job) => {
    if (!job.enabled) return logScheduler(schedulerLogs, moment, `Skipping Disabled Job ${job.name}`);
    logScheduler(schedulerLogs, moment, `Setting up Scheduler Job: ${job.name}`);
    cron.schedule(job.schedule, () => job.action(job));
    if (job.runOnStart) job.action(job);
  });
}

function logScheduler(schedulerLogs, moment, content) {
  if (schedulerLogs) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', content, '\x1b[0m');
}

const getJobs = (runEveryJobOnStart) => [
  {
    name: 'Chat Expired Attachments',
    action: require('./tasks/chat-expiredAttachments'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Chat Game Messages',
    action: require('./tasks/chat-gameMessages'),
    schedule: '* * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Channel History',
    action: require('./tasks/channel-history'),
    schedule: '0 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Profile Sync To Elasticsearch',
    action: require('./tasks/profile-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game Sync To Elasticsearch',
    action: require('./tasks/game-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game Name Sync To Elasticsearch',
    action: require('./tasks/gameName-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game Register Plays',
    action: require('./tasks/game-registerPlays'),
    schedule: '*/5 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Delete Invalid S3 FilDes',
    action: require('./tasks/s3-deleteFiles'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Delete Unused Games',
    action: require('./tasks/game-deleteUnused'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Quests Clear Dailys',
    action: require('./tasks/quests-clearDailys'),
    schedule: '0 23 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Quests Clear Weeklys',
    action: require('./tasks/quests-clearWeeklys'),
    schedule: '0 0 * * 1',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Quests Clear Monthlys',
    action: require('./tasks/quests-clearMonthlys'),
    schedule: '0 0 1 * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Shuffle Sponsored Posts',
    action: require('./tasks/sponsored-post-shuffle'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Send Daily Emails',
    action: require('./tasks/send-daily-emails'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Send Weekly Emails',
    action: require('./tasks/send-weekly-emails'),
    schedule: '0 0 * * 0',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Update has_additional Field',
    action: require('./tasks/update-has-additional-field'),
    schedule: '0 12 */15 * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Delete expired Codes',
    action: require('./tasks/delete-expired-codes'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Auto accept official communities',
    action: require('./tasks/auto-accept-official-communities'),
    schedule: '0 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
];

module.exports = setupScheduler;
