function setupBull() {

  const Queue = require('bull');
  const Redis = require('ioredis');
  const moment = require('moment')();
  const LoggingRepository = require('../../Repositories/Logging')
  const Env = use('Env')
  const hasRedis = Env.get('REDIS_ENABLED');
  const host = Env.get('REDIS_HOST');
  const port = Env.get('REDIS_PORT');
  const disableCluster = Env.get('REDIS_DISABLE_CLUSTER');
  const runEveryJobOnStart = Env.get('BULL_RUN_EVERY_JOB_ON_START');
  const bullConfig = { redis: { host, port } };
  const ioCluster = !disableCluster && hasRedis && new Redis.Cluster([bullConfig.redis]);
  
  LoggingRepository.log({
    environment: process.env.NODE_ENV,
    type: 'startup',
    source: 'backend',
    context: "bull",
    message: hasRedis ? `Getting ready to start bull -> ${JSON.stringify({ bullConfig })}` : 'Redis/Bull Disabled',
  });

  if (!hasRedis) return logBull(moment, 'Redis Disabled, no Bull Queues will be run.');

  getJobs(Queue, bullConfig, ioCluster, runEveryJobOnStart).forEach((job) => {
    if (!job.enabled) return logBull(moment, `Skipping Disabled Job ${job.name}`);
    logBull(moment, `Setting up Bull Job: ${job.name}`);
    job.queue.process(job.action);
    job.queue.on('waiting', () => logBull(moment, `Task Started: ${job.name}`));
    job.queue.on('completed', () => logBull(moment, `Task Completed: ${job.name}`));
    job.queue.on('error', (error)  => logBull(moment, `Task Error: ${job.name}`, error));
    job.queue.on('failed', (job, error) => logBull(moment, `Task Failed: ${job.name}`, error));
    job.queue.clean(0);
    if (job.runOnStart) job.queue.add(job.payload, job.options);
    if (job.runOnSchedule) job.queue.add(job.payload, { ...job.options, ...job.schedule });
  });
}

function logBull(moment, content) {
  console.log('\x1b[36m', 'BULL', moment.format('D MMM HH:mm:ss'), '-', content, '\x1b[0m');
}

function getJobs(Queue, bullConfig, ioCluster, runEveryJobOnStart) {
  const prefixedConfig = (prefix) => {
    const config = { ...bullConfig, prefix };
    if (ioCluster) config.createClient = () => ioCluster;
  };
  return [
    {
      name: 'Chat Expired Attachments',
      queue: new Queue('Chat Expired Attachments', prefixedConfig('{chat-expiredAttachments}')),
      action: require('./tasks/chat-expiredAttachments'),
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: true,
      enabled: true,
    },
    {
      name: 'Quests Clear Weeklys',
      queue: new Queue('Quests Clear Weeklys', prefixedConfig('{quests-clearWeeklys}')),
      action: require('./tasks/quests-clearWeeklys'),
      options: { jobId: Date.now() },
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
      options: { jobId: Date.now() },
      payload: {},
      schedule: { repeat: { cron: '0 0 1 * *' } },
      runOnSchedule: true,
      runOnStart: runEveryJobOnStart ? true : false,
      enabled: true,
    },
  ];
}

module.exports = setupBull;
