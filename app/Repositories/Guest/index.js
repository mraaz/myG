
const Guest = use('App/Models/Guest');

class GuestRepository {

  async register({ publicKey }) {
    const guest = new Guest();
    guest.public_key = publicKey;
    await guest.save();
    return { id: guest.id };
  }

}

module.exports = new GuestRepository();