'use strict'

const { log } = require('../../Common/logger')
const ProfileRepository = require('../../Repositories/Profile')

class ProfileController {
  async fetchProfileInfo({ auth, params, response }) {
    const requestingUserId = auth.user.id
    if (!requestingUserId) throw new Error('Auth Error')
    const alias = params.alias
    log('PROFILE', `User ${requestingUserId} requesting profile info for ${alias}`)
    const { profile } = await ProfileRepository.fetchProfileInfo({ requestingProfileId, alias })
    return response.send({ profile })
  }
}

module.exports = ProfileController
