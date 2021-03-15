async function guardExecution(job, delay) {
  const Database = use('Database')
  const jobRecord = await Database.from('bull_jobs').where({ job }).first()
  const lastExecution = !!jobRecord?.last_execution && Date.now() - jobRecord?.last_execution
  console.log(job, delay, jobRecord, lastExecution)
  if (lastExecution && delay && lastExecution < delay) {
    throw new Error(`Tried to execute job ${job} but last execution ${lastExecution} was less than delay ${delay}`)
  }
  await Database.from('bull_jobs').where({ job }).delete()
  await Database.table('bull_jobs').insert({ job, last_execution: new Date() });
}

module.exports = guardExecution;
