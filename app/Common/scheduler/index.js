function setupScheduler() {

  const Env = use('Env')
  const hasRedis = Env.get('REDIS_ENABLED');
  const schedulerLogs = Env.get('SCHEDULER_LOGS');
  const moment = require('moment')();
  const cron = require('node-cron')
  const runEveryJobOnStart = Env.get('SCHEDULER_RUN_EVERY_JOB_ON_START') == 'true' ? true : false;
  
  if (!hasRedis) return logScheduler(schedulerLogs, moment, 'Redis Disabled, no Scheduler Queues will be run.');

  const runJob = async (job, action) => {
    try {
      await action();
    } catch(error) {
      console.error(`Cron Job (${job}): ${error.message}`);
    }
  }

  getJobs(runEveryJobOnStart).forEach((job) => {
    if (!job.enabled) return logScheduler(schedulerLogs, moment, `Skipping Disabled Job ${job.name}`);
    logScheduler(schedulerLogs, moment, `Setting up Scheduler Job: ${job.name}`);
    cron.schedule(job.schedule, () => runJob(job.name, () => job.action(job)));
    if (job.runOnStart) runJob(job.name, () => job.action(job));
  });
}

function logScheduler(schedulerLogs, moment, content) {
  if (schedulerLogs) console.log('\x1b[36m', 'SCHEDULER', moment.format('D MMM HH:mm:ss'), '-', content, '\x1b[0m');
}

const getJobs = (runEveryJobOnStart) => [
  {
    name: 'Chat_Expired_Attachments',
    action: require('./tasks/chat-expiredAttachments'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Chat_Game_Messages',
    action: require('./tasks/chat-gameMessages'),
    schedule: '* * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Disconnect_Users',
    action: require('./tasks/disconnect-users'),
    schedule: '0 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Channel_History',
    action: require('./tasks/channel-history'),
    schedule: '0 * * * *',
    runOnStart: true,
    enabled: true,
  },
  {
    name: 'Profile_Sync_To_Elasticsearch',
    action: require('./tasks/profile-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game_Sync_To_Elasticsearch',
    action: require('./tasks/game-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game_Name_Sync_To_Elasticsearch',
    action: require('./tasks/gameName-syncToElasticsearch'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Game_Register_Plays',
    action: require('./tasks/game-registerPlays'),
    schedule: '*/5 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Delete_Invalid_S3_FilDes',
    action: require('./tasks/s3-deleteFiles'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Delete_Unused_Games',
    action: require('./tasks/game-deleteUnused'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Quests_Clear_Dailys',
    action: require('./tasks/quests-clearDailys'),
    schedule: '0 23 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Quests_Clear_Weeklys',
    action: require('./tasks/quests-clearWeeklys'),
    schedule: '0 0 * * 1',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Quests_Clear_Monthlys',
    action: require('./tasks/quests-clearMonthlys'),
    schedule: '0 0 1 * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Shuffle_Sponsored_Posts',
    action: require('./tasks/sponsored-post-shuffle'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: false,
  },
  {
    name: 'Send_Daily_Emails',
    action: require('./tasks/send-daily-emails'),
    schedule: '0 0 * * *',
    runOnStart: true,
    enabled: true,
  },
  {
    name: 'Send_Weekly_Emails',
    action: require('./tasks/send-weekly-emails'),
    schedule: '0 0 * * 0',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Update_has_additional_Field',
    action: require('./tasks/update-has-additional-field'),
    schedule: '0 12 */15 * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Delete_expired_Codes',
    action: require('./tasks/delete-expired-codes'),
    schedule: '0 0 * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
  {
    name: 'Auto_accept_official_communities',
    action: require('./tasks/auto-accept-official-communities'),
    schedule: '0 * * * *',
    runOnStart: runEveryJobOnStart ? true : false,
    enabled: true,
  },
];

module.exports = setupScheduler;
