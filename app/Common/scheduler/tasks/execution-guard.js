const DELAY_MILLISECONDS = 15000

async function redisGuard(job) {
  const RedisRepository = require('../../../Repositories/Redis')
  const lock = await RedisRepository.lock(job, DELAY_MILLISECONDS)
  if (!lock) throw new Error(`Failed to Acquire Lock for ${job}`)
}

async function sqlGuard(job) {
  const Database = use('Database')
  const jobRecord = await Database.from('bull_jobs').where({ job }).first()
  const lastExecution = !!jobRecord?.last_execution && Date.now() - jobRecord?.last_execution
  if (lastExecution && lastExecution < DELAY_MILLISECONDS) {
    throw new Error(`Tried to execute job ${job} but it was last executed ${lastExecution / 1000}secs ago.`)
  }
  await Database.from('bull_jobs').where({ job }).delete()
  await Database.table('bull_jobs').insert({ job, last_execution: new Date() })
}

// Let me know how this behaves in production, we might need it to be the Redis Guard instead.
module.exports = redisGuard
