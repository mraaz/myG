function setupBull() {

  const { v4: uuidv4 } = require('uuid');
  const Queue = require('bull');
  const Redis = require('ioredis');
  const moment = require('moment')();
  const Env = use('Env')
  const hasRedis = Env.get('REDIS_ENABLED');
  const host = Env.get('REDIS_HOST');
  const port = Env.get('REDIS_PORT');
  const bullLogs = Env.get('BULL_LOGS');
  const disableCluster = Env.get('REDIS_DISABLE_CLUSTER');
  const runEveryJobOnStart = Env.get('BULL_RUN_EVERY_JOB_ON_START') == 'true' ? true : false;
  const bullConfig = { redis: { host, port } };
  const ioCluster = !disableCluster && hasRedis && new Redis.Cluster([bullConfig.redis]);

  if (!hasRedis) return logBull(bullLogs, moment, 'Redis Disabled, no Bull Queues will be run.');

  getJobs(Queue, bullConfig, ioCluster, uuidv4, runEveryJobOnStart).forEach((job) => {
    if (!job.enabled) return logBull(bullLogs, moment, `Skipping Disabled Job ${job.name}`);
    logBull(bullLogs, moment, `Setting up Bull Job: ${job.name}`);
    job.queue.process(job.action);
    job.queue.on('waiting', () => logBull(bullLogs, moment, `Task Started: ${job.name}`));
    job.queue.on('completed', () => logBull(bullLogs, moment, `Task Completed: ${job.name}`));
    job.queue.on('error', (error)  => logBull(bullLogs, moment, `Task Error: ${job.name}`, error));
    job.queue.on('failed', (job, error) => logBull(bullLogs, moment, `Task Failed: ${job.name}`, error));
    job.queue.clean(0);
    if (job.runOnStart) job.queue.add(job.payload, job.options);
    if (job.runOnSchedule) job.queue.add(job.payload, { ...job.options, ...job.schedule });
  });
}


function logBull(bullLogs, moment, content) {
  if (bullLogs) console.log('\x1b[36m', 'BULL', moment.format('D MMM HH:mm:ss'), '-', content, '\x1b[0m');
}

function getJobs(Queue, bullConfig, ioCluster, uuidv4, runEveryJobOnStart) {
  const prefixedConfig = (prefix) => {
    const config = { ...bullConfig, prefix };
    if (ioCluster) config.createClient = () => ioCluster;
    return config
  };
  return [
    {
      name: 'Chat Expired Attachments',
      queue: new Queue('Chat Expired Attachments', prefixedConfig('{chat-expiredAttachments}')),
      action: require('./tasks/chat-expiredAttachments'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Chat Game Messages',
      queue: new Queue('Chat Game Messages', prefixedConfig('{chat-gameMessages}')),
      action: require('./tasks/chat-gameMessages'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '* * * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Profile Sync To Elasticsearch',
      queue: new Queue('Profile Sync To Elasticsearch', prefixedConfig('{profile-syncToElasticsearch}')),
      action: require('./tasks/profile-syncToElasticsearch'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Game Sync To Elasticsearch',
      queue: new Queue('Game Sync To Elasticsearch', prefixedConfig('{game-syncToElasticsearch}')),
      action: require('./tasks/game-syncToElasticsearch'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Game Name Sync To Elasticsearch',
      queue: new Queue('Game Name Sync To Elasticsearch', prefixedConfig('{gameName-syncToElasticsearch}')),
      action: require('./tasks/gameName-syncToElasticsearch'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Game Register Plays',
      queue: new Queue('Game Register Plays', prefixedConfig('{game-registerPlays}')),
      action: require('./tasks/game-registerPlays'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '*/5 * * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Delete Invalid S3 FilDes',
      queue: new Queue('Delete Invalid S3 Files', prefixedConfig('{s3-deleteFiles}')),
      action: require('./tasks/s3-deleteFiles'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Delete Unused Games',
      queue: new Queue('Delete Unused Games', prefixedConfig('{game-deleteUnused}')),
      action: require('./tasks/game-deleteUnused'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Quests Clear Dailys',
      queue: new Queue('Quests Clear Dailys', prefixedConfig('{quests-clearDailys}')),
      action: require('./tasks/quests-clearDailys'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 23 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Quests Clear Weeklys',
      queue: new Queue('Quests Clear Weeklys', prefixedConfig('{quests-clearWeeklys}')),
      action: require('./tasks/quests-clearWeeklys'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * 1' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Quests Clear Monthlys',
      queue: new Queue('Quests Clear Monthlys', prefixedConfig('{quests-clearMonthlys}')),
      action: require('./tasks/quests-clearMonthlys'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 1 * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Shuffle Sponsored Posts',
      queue: new Queue('Shuffle Sponsored Posts', prefixedConfig('{sponsored-post-shuffle}')),
      action: require('./tasks/sponsored-post-shuffle'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Send Daily Emails',
      queue: new Queue('Send Daily Emails', prefixedConfig('{send-daily-emails}')),
      action: require('./tasks/send-daily-emails'),
      options: { jobId: uuidv4() },
      payload: { delay: 60000 },
      schedule: { repeat: { cron: '45 23 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Send Weekly Emails',
      queue: new Queue('Send Weekly Emails', prefixedConfig('{send-weekly-emails}')),
      action: require('./tasks/send-weekly-emails'),
      options: { jobId: uuidv4() },
      payload: { delay: 60000 },
      schedule: { repeat: { cron: '0 0 * * 0' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Update has_additional Field',
      queue: new Queue('Update has_additional Field', prefixedConfig('{update-has-additional-field}')),
      action: require('./tasks/update-has-additional-field'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 12 */15 * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
    {
      name: 'Delete expired Codes',
      queue: new Queue('Delete expired Codes', prefixedConfig('{delete-expired-codes}')),
      action: require('./tasks/delete-expired-codes'),
      options: { jobId: uuidv4() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
  ];
}

module.exports = setupBull;
