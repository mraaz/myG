'use strict'

const Database = use('Database')
const { getJobs } = require('../../Common/scheduler')

class SchedulerController {
  async triggerJob({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('No User Logged In')
      const securityCheck = await Database.from('admins').where({ user_id: requestingUserId, permission_level: 1 }).first()
      const isAdmin = securityCheck && securityCheck.user_id == requestingUserId
      if (!isAdmin) throw new Error('Feature only for admins')
      const jobs = getJobs()
      const validJobs = jobs.map((job) => job.name)
      const requestedJob = params.job
      if (!requestedJob || !validJobs.includes(requestedJob)) throw new Error('Please specify a valid job: ' + validJobs.join(' | '))
      const job = jobs.find((job) => job.name === requestedJob)
      await job.action(job)
      return response.send({ success: requestedJob })
    } catch (error) {
      return response.send({ error: error.message })
    }
  }
}

module.exports = SchedulerController
