'use strict'

const Database = use('Database')
const { getJobs } = require('../../Common/scheduler')

class SchedulerController {
  async triggerJob({ auth, params, request, response }) {
    try {
      if (auth && auth.user && auth.user.id) {
        const requestingUserId = auth.user.id
        const securityCheck = await Database.from('admins').where({ user_id: requestingUserId, permission_level: 1 }).first()
        const isAdmin = securityCheck && securityCheck.user_id == requestingUserId
        if (!isAdmin) return response.send('Invalid User Permissions', 403)
      } else if (request.headers().authorization) {
        const EXTERNAL_SCHEDULE_API_KEY = process.env.EXTERNAL_SCHEDULE_API_KEY || 'debug'
        if (request.headers().authorization !== EXTERNAL_SCHEDULE_API_KEY) return response.send('Invalid Authentication Key', 403)
      } else {
        return response.send('Missing Authentication', 403)
      }

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
