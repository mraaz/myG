#!/usr/bin/env python

import random

from random import shuffle, seed
from faker.providers.person.en import Provider
from random import randrange

from faker import Faker
from faker.providers import BaseProvider

fake = Faker()

# Our custom provider inherits from the BaseProvider
class TravelProvider(BaseProvider):
  def destination(self):
    destinations = ['USA', 'Australia', 'Brazil', 'Philippines', 'UK', 'Spain']
    # We select a random destination from the list and return it
    return random.choice(destinations)


def main():
  status = ['online', 'afk', 'playing', 'offline']
  fake.add_provider(TravelProvider)

  alias = list(set(Provider.first_names))

  seed(4321)
  shuffle(alias)

  start = 100
  stop = 111
  create_celebrity = True

  for x in range(start, stop, 1):
    if (create_celebrity and x == start):
      print(".raw(\"INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, alias[x], fake.first_name(), fake.last_name(), alias[x] + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination()  ) )
    else:
     print(".raw(\"INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, alias[x], fake.first_name(), fake.last_name(), alias[x] + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination()  ) )

    # print(".raw(\"INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, alias[x], fake.first_name(), fake.last_name(), alias[x] + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination()  ) )
    myself = randrange(start-1, x)
    friend = randrange(start-1, x)
    if (myself == friend or myself == start-1 or friend == start-1):
      continue
    print(".raw(\"INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) values (%s,%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, myself, friend) )

if __name__ == "__main__":
    main()


  # print(f'name: {fake.name()}')
  # print(f'address: {fake.city()}')
  #
  # print(f'text: {fake.text()}')
  #
  # # Add the TravelProvider to our faker object
  #
  # # We can now use the destination method:
  # print(fake.destination())
  #
  # print(fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None))

#   var arrTags = this.state.address.split(',')
# if (arrTags.length == 1) {
# this.state.country_ = arrTags[0]
# } else {
# for (var i = 0; i < arrTags.length; i++) {
#   if (i == arrTags.length - 1) {
#     this.state.country_ = arrTags[i].trim()
#   } else {
#     this.state.region_ += arrTags[i] + ','
#   }
# }
# }
