'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Import_dummy_data_Schema extends Schema {
  up () {
    this
    .raw("INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (100,'Katherine','Michael','Mcintyre','myG@myG.gg','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','offline', '1970-01-12 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', 'Australia', 'mnraaz@gmail.com', 'Waiting for Player 2', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00')")


  }

  down () {

  }
}

module.exports = Import_dummy_data_Schema
