#!/usr/bin/env python

# If create_celebrity is true:
# email: myG@myG.gg
# pass: mygame

import random

from random import shuffle, seed
from random import randrange
from random import choice

from faker import Faker
from faker.providers import BaseProvider
from faker.providers.person.en import Provider

fake = Faker()

# Our custom provider inherits from the BaseProvider
class TravelProvider(BaseProvider):
  def destination(self):
    destinations = ['USA', 'Australia', 'Brazil', 'Philippines', 'UK', 'Spain']
    # We select a random destination from the list and return it
    return random.choice(destinations)


def main():
  start = 100
  stop = 1110
  create_celebrity = True

  answer = choice(['Yes', 'No'])

  status = ['online', 'afk', 'playing', 'offline']

  #profile
  relationship_Status = ['Waiting for Player 2', 'Game in progress']

  #game_experiences
  ge_experience = ['Casual', 'Semi Pro', 'Professional']
  ge_status = ['Actively Gaming', 'Sometimes...', 'Moved On']
  ge_played = [1,2,4,5,42]
  ge_commendation = ['Apprentice', 'Elite', 'Expert', 'Hero', 'Master', 'Grand Master']

  #esports_bio
  eb_status = ['Actively looking for a team', 'Maybe looking for a team', 'Do not disturb please!']

  #schedule_games
  sg_region = ['North America', 'Europe', 'Asia', 'Russia', 'South America', 'Oceania', 'Middle East', 'Africa', 'Central America']
  sg_platform = ['PC', 'XB', 'PS', 'Nintendo', 'Mobile', 'Tabletop']
  sg_visibility = ['Public', 'Friends', 'Group', 'Hidden']
  sg_limit = [5,10,20,25,30,40,50,100,42]

  fake.add_provider(TravelProvider)
  alias = list(set(Provider.first_names))
  seed(4321)
  shuffle(alias)



  for x in range(start, stop, 1):
    #USERS
    if (create_celebrity and x == start):
      print("INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','myG@myG.gg','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://myG.gg/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://myG.gg/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, alias[x], fake.first_name(), fake.last_name(), random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status) ))
    else:
      print("INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://myG.gg/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://myG.gg/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, alias[x] + str(random.randint(1,88)), fake.first_name(), fake.last_name(), alias[x] + str(random.randint(1,88)) + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status)) )

    #GAME EXPERIENCES && ESPORTS_EXPERIENCES
    #Game_id: 998 = Dota 2
    #Game_id: 1015 = Clash Royale
    #Game IDs range from 1 to 1037
    for y in range(5):
      print("INSERT INTO game_experiences (user_id, game_names_id, experience, comments, played, commendation, status, link, ratings, created_at, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '%s', '%s', %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, random.randint(1,1037), random.choice(ge_experience), fake.sentence(), random.choice(ge_played), random.choice(ge_commendation), random.choice(ge_status), fake.image_url(), random.randint(1,5) ) )
      print("INSERT INTO esports_experiences (user_id, game_names_id, role_title, team_name, duration, achievements, created_at, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, random.randint(1,1037), fake.job(), fake.company(), random.choice(ge_played), fake.sentence() ) )
      #SCHEDULE_GAMES
      print("INSERT INTO schedule_games (user_id, game_names_id, region, experience, start_date_time, end_date_time, platform, description, other, expiry, visibility, `limit`, accept_msg, schedule_games_GUID, vacancy, created_at, updated_at) values (%s, %s, '%s', '%s', '2019-12-01 00:00:00', '2029-12-01 00:00:00', '%s', '%s', '%s', '2025-08-08 00:00:00', %s, %s, '%s', '%s', %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, random.randint(1,1037), random.choice(sg_region), random.choice(ge_experience), random.choice(sg_platform), fake.sentence(), fake.sentence(), random.randint(1,4), random.choice(sg_limit), fake.sentence(), fake.uuid4(), random.randint(0,1) ) )

    print("INSERT INTO esports_bios (user_id, status, email_visibility, games_of_ardour, career_highlights, created_at, updated_at) values (%s, '%s', '%s', 'Dota 2, Clash Royale, Secret of Evermore', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, random.choice(eb_status), answer, fake.sentence() ) )




    #FRIENDS
    if (create_celebrity and x <= start+1 ):
      continue
    if (create_celebrity):
      myself = randrange(start+1, x)
      friend = randrange(start+1, x)
    else:
      myself = randrange(start-1, x)
      friend = randrange(start-1, x)


    if(create_celebrity and x != start):
      print("INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00');" % (start, x) )
    if (myself == friend or myself == start-1 or friend == start-1):
      continue
    print("INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00');" % (myself, friend) )

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
