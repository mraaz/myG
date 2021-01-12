function setupBull() {

  const Queue = require('bull');
  const moment = require('moment')();
  const LoggingRepository = require('../../Repositories/Logging')
  const Env = use('Env')
  const hasRedis = Env.get('REDIS_ENABLED');
  const host = Env.get('REDIS_HOST');
  const port = Env.get('REDIS_PORT');
  const bullConfig = { redis: { host, port } };
  
  LoggingRepository.log({
    environment: process.env.NODE_ENV,
    type: 'startup',
    source: 'backend',
    context: "bull",
    message: `Getting ready to start bull -> ${JSON.stringify({ hasRedis, bullConfig })}`
  });

  if (!hasRedis) return logBull(moment, 'Redis Disabled, no Bull Queues will be run.');

  getJobs(Queue, bullConfig).forEach((job) => {
    if (!job.enabled) return logBull(moment, `Skipping Disabled Job ${job.name}`);
    logBull(moment, `Setting up Bull Job: ${job.name}`);
    job.queue.process(job.action);
    job.queue.on('waiting', () => logBull(moment, `Task Started: ${job.name}`));
    job.queue.on('completed', () => logBull(moment, `Task Completed: ${job.name}`));
    job.queue.on('error', (error)  => logBull(moment, `Task Error: ${job.name}`, error));
    job.queue.on('failed', (job, error) => logBull(moment, `Task Failed: ${job.name}`, error));
    if (job.runOnStart) job.queue.add(job.payload, job.options);
    if (job.runOnSchedule) job.queue.add(job.payload, { ...job.options, ...job.schedule });
  });
}

function logBull(moment, content) {
  console.log('\x1b[36m', 'BULL', moment.format('D MMM HH:mm:ss'), '-', content, '\x1b[0m');
}

function getJobs(Queue, bullConfig) {
  return [
    {
      name: 'Chat Expired Attachments',
      queue: new Queue('chat-expiredAttachments', bullConfig),
      action: require('./tasks/chat-expiredAttachments'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Chat Game Messages',
      queue: new Queue('chat-gameMessages', bullConfig),
      action: require('./tasks/chat-gameMessages'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '* * * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Profile Sync To Elasticsearch',
      queue: new Queue('profile-syncToElasticsearch', bullConfig),
      action: require('./tasks/profile-syncToElasticsearch'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Game Sync To Elasticsearch',
      queue: new Queue('game-syncToElasticsearch', bullConfig),
      action: require('./tasks/game-syncToElasticsearch'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Delete Invalid S3 Files',
      queue: new Queue('s3-deleteFiles', bullConfig),
      action: require('./tasks/s3-deleteFiles'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
    {
      name: 'Delete Unused Games',
      queue: new Queue('game-deleteUnused', bullConfig),
      action: require('./tasks/game-deleteUnused'),
      options: {},
      payload: {},
      schedule: { repeat: { cron: '0 0 * * *' } },
      runOnSchedule: true,
      runOnStart: false,
      enabled: true,
    },
  ];
}

module.exports = setupBull;
