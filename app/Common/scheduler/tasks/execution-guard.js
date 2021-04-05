async function redisGuard(job) {
  const RedisRepository = require('../../../Repositories/Redis')
  const lock = await RedisRepository.lock(job)
  if (!lock) throw new Error(`Failed to Acquire Lock for ${job}`)
  else {
    console.log('PASSED LOCK')
  }

  return
}

// async function sqlGuard(job) {
//   const Database = use('Database')
//   const jobRecord = await Database.from('bull_jobs')
//     .where({ job })
//     .first()
//   const lastExecution = !!jobRecord?.last_execution && Date.now() - jobRecord?.last_execution
//   if (lastExecution && lastExecution < DELAY_MILLISECONDS) {
//     throw new Error(`Tried to execute job ${job} but it was last executed ${lastExecution / 1000}secs ago.`)
//   }
//   await Database.from('bull_jobs')
//     .where({ job })
//     .delete()
//   await Database.table('bull_jobs').insert({ job, last_execution: new Date() })
// }

module.exports = redisGuard
