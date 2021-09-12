async function lockJob(job) {
  return // Disabling Locks
  const RedisRepository = require('../../../Repositories/Redis')
  const lock = await RedisRepository.lock(job)
  if (!lock) throw new Error(`Cron Job (${job}): Failed to Acquire Lock`)
  console.log(`Cron Job (${job}): Acquired Lock`)
  return lock
}

async function unlockJob(job, lock) {
  return // Disabling Locks
  try {
    await waitBeforeReleasingLock(10)
    const RedisRepository = require('../../../Repositories/Redis')
    await RedisRepository.unlock(lock)
    console.log(`Cron Job (${job}): Released Lock`)
  } catch (error) {
    console.error(`Cron Job (${job}): Failed to Release Lock: ${error.message}`)
  }
}

function waitBeforeReleasingLock(seconds) {
  return new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000))
}

module.exports = { lockJob, unlockJob }
