'use strict'

const { log } = require('../../Common/logger');
const GuestRepository = require('../../Repositories/Guest');

class GuestController {

  async register({ request, response }) {
    log('GUEST', `Registering Guest`);
    const publicKey = request.only(['publicKey']).publicKey;
    const { id } = await GuestRepository.register({ publicKey });
    return response.send({ id });
  }

}

module.exports = GuestController;
