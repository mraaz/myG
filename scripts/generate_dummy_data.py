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

  #Gaming intestests, esportsExp, scheduledGames how many per user
  mini_start = start
  mini_stop = 105
  create_celebrity = True
  adonisJS = False #print out for adonis or False for SQL

  answer = choice(['Yes', 'No'])

  status = ['online', 'afk', 'playing', 'offline']

  #profile
  relationship_Status = ['Waiting for Player 2', 'Game in progress']

  #game_experiences
  ge_experience = ['Casual', 'Semi Pro', 'Professional']
  ge_status = ['Actively Gaming', 'Sometimes...', 'Moved On']
  ge_played = [1,2,4,5,42]
  ge_commendation = ['Apprentice', 'Elite', 'Expert', 'Hero', 'Master', 'Grand Master']
  ge_tags = ['Tags1, Tags2, Tags3, Tag4, Tag5, Tag6, Tags7, Tags8', 'Loooooong Taaaag, This is a long work that needs to be said and if its not said then what the point of all this....myG rulezz, another tag', 'TagMe1, TagMe2, TagMe3, TagMe4', '1', 'Stuff1, Stuff3']

  #esports_bio
  eb_status = ['Actively looking for a team', 'Maybe looking for a team', 'Do not disturb please!']

  #schedule_games
  sg_region = ['North America', 'Europe', 'Asia', 'Russia', 'South America', 'Oceania', 'Middle East', 'Africa', 'Central America']
  sg_platform = ['PC', 'XB', 'PS', 'Nintendo', 'Mobile', 'Tabletop']
  sg_visibility = ['Public', 'Friends', 'Group', 'Hidden']
  sg_limit = [5,10,20,25,30,40,50,100,42]

  #posts
  post_types = ['text', 'photo']
  #Due to the inverted comma's we can't import this into AdonisJS, so only mySQL will have images.
  post_media_URL = ['[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/viber_image_2019-09-26_11-52-23.jpg\", \"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/John-Smith.jpg\"]', '[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/dota_2_background.jpg\"]', '[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/logo_JPG+(1).jpg\"]', '[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/mobile.jpg\"]', '[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/rubick.JPG\"]', '[\"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/rubick2.jpg\", \"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/viber_image_2019-09-26_10-56-12.jpg\", \"https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/PB_AWS_logo_RGB_stacked.547f032d90171cdea4dd90c258f47373c5573db5.png\"]']

  #usergroups
  ug_permission_level = [1,2,3,42]

  fake.add_provider(TravelProvider)
  alias = list(set(Provider.first_names))
  seed(4321)
  shuffle(alias)

  tiny_start = mini_start
  tiny_stop = mini_stop

  gap = mini_stop - mini_start
  tiny_gap = tiny_stop - tiny_start

  for x in range(start, stop, 1):
    mini_start+=gap
    mini_stop+=gap

    #USERS
    if (create_celebrity and x == start):
      if(adonisJS):
        print(".raw(\"INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','myG@myG.gg','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, alias[x], fake.first_name(), fake.last_name(), random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status) ))
      else:
        print("INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','myG@myG.gg','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, alias[x], fake.first_name(), fake.last_name(), random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status) ))
    else:
      if(adonisJS):
        print(".raw(\"INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, alias[x] + str(random.randint(1,88)), fake.first_name(), fake.last_name(), alias[x] + str(random.randint(1,88)) + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status)) )
      else:
        print("INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, country, contact_info, relationship_status, profile_bg, created_at, updated_at) values (%s,'%s','%s','%s','%s','$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm','https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png','%s', '%s', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '%s', 'mnraaz@gmail.com', '%s', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/universe.jpg', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, alias[x] + str(random.randint(1,88)), fake.first_name(), fake.last_name(), alias[x] + str(random.randint(1,88)) + "@gmail.com" , random.choice(status), fake.date(pattern='%Y-%m-%d 00:00:00', end_datetime=None), fake.destination(), random.choice(relationship_Status)) )

    if(adonisJS):
      print(".raw(\"INSERT INTO esports_bios (user_id, status, email_visibility, games_of_ardour, career_highlights, created_at, updated_at) values (%s, '%s', '%s', 'Dota 2, Clash Royale, Secret of Evermore', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, random.choice(eb_status), answer, fake.sentence().replace("'", "") ) )
      print(".raw(\"INSERT INTO `groups` (id, user_id, name, group_img, type, created_at, updated_at) values (%s, %s, '%s', 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/samuel-67197_1280.jpg', %s, '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, x, alias[x], random.randint(1,3) ) )
    else:
      print("INSERT INTO esports_bios (user_id, status, email_visibility, games_of_ardour, career_highlights, created_at, updated_at) values (%s, '%s', '%s', 'Dota 2, Clash Royale, Secret of Evermore', '%s', '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, random.choice(eb_status), answer, fake.sentence().replace("'", "") ) )
      print("INSERT INTO `groups` (id, user_id, name, group_img, type, created_at, updated_at) values (%s, %s, '%s', 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/samuel-67197_1280.jpg', %s, '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, x, alias[x], random.randint(1,3) ) )

    #GAME EXPERIENCES && ESPORTS_EXPERIENCES
    #Game_id: 998 = Dota 2
    #Game_id: 1015 = Clash Royale
    #Game IDs range from 1 to 1037
    for y in range(mini_start, mini_stop, 1):
      if(adonisJS):
        print(".raw(\"INSERT INTO game_experiences (user_id, game_names_id, experience, comments, played, commendation, status, link, ratings, tags, created_at, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '%s', '%s', %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, random.randint(1,1037), random.choice(ge_experience), fake.sentence().replace("'", ""), random.choice(ge_played), random.choice(ge_commendation), random.choice(ge_status), fake.image_url(), random.randint(1,5), random.choice(ge_tags) ) )
        print(".raw(\"INSERT INTO esports_experiences (user_id, game_names_id, role_title, team_name, duration, achievements, skills, created_at, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, random.randint(1,1037), fake.job().replace("'", ""), fake.company().replace("'", ""), random.choice(ge_played), fake.sentence().replace("'", ""), random.choice(ge_tags) ) )
        #SCHEDULE_GAMES
        print(".raw(\"INSERT INTO schedule_games (id, user_id, game_names_id, region, experience, start_date_time, end_date_time, platform, description, other, expiry, visibility, `limit`, accept_msg, schedule_games_GUID, vacancy, created_at, updated_at) values (%s, %s, %s, '%s', '%s', '2019-12-01 00:00:00', '2029-12-01 00:00:00', '%s', '%s', '%s', '2025-08-08 00:00:00', %s, %s, '%s', '%s', %s, '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (y, x, random.randint(1,1037), random.choice(sg_region), random.choice(ge_experience), random.choice(sg_platform), fake.sentence().replace("'", ""), fake.sentence().replace("'", ""), random.randint(1,4), random.choice(sg_limit), fake.sentence().replace("'", ""), fake.uuid4(), random.randint(0,1) ) )
        print(".raw(\"INSERT INTO posts (id, user_id, content, type, created_at, updated_at) values (%s, %s, '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (y, x, fake.sentence().replace("'", ""), random.choice(post_types) ) )
        if (x != start):
          print(".raw(\"INSERT INTO notifications (user_id, other_user_id, activity_type, post_id, created_at, updated_at) values (%s, %s, 2, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, randrange(start, x), y ) )
          print(".raw(\"INSERT INTO notifications (user_id, other_user_id, activity_type, schedule_games_id, created_at, updated_at) values (%s, %s, 10, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, randrange(start, x), y ) )
          print(".raw(\"INSERT INTO notifications (user_id, other_user_id, activity_type, schedule_games_id, created_at, updated_at) values (%s, %s, 16, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (x, randrange(start, x), y ) )
          for i in range (tiny_start, tiny_stop, 1):
            print(".raw(\"INSERT INTO comments (id, post_id, user_id, content, created_at, updated_at) values (%s, %s, %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (i, y, randrange(start, x), fake.sentence().replace("'", "")  ) )
            for j in range(2):
              print(".raw(\"INSERT INTO replies (comment_id, user_id, content, created_at, updated_at) values (%s, %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (i, randrange(start, x), fake.sentence().replace("'", "")  ) )

          tiny_start+=tiny_gap
          tiny_stop+=tiny_gap

      else:
        print("INSERT INTO game_experiences (user_id, game_names_id, experience, comments, played, commendation, status, link, ratings, created_at, tags, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '%s', '%s', %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, random.randint(1,1037), random.choice(ge_experience), fake.sentence().replace("'", ""), random.choice(ge_played), random.choice(ge_commendation), random.choice(ge_status), fake.image_url(), random.randint(1,5), random.choice(ge_tags) ) )
        print("INSERT INTO esports_experiences (user_id, game_names_id, role_title, team_name, duration, achievements, skills, created_at, updated_at) values (%s, %s, '%s', '%s', %s, '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, random.randint(1,1037), fake.job().replace("'", ""), fake.company().replace("'", ""), random.choice(ge_played), fake.sentence().replace("'", ""), random.choice(ge_tags) ) )
        #SCHEDULE_GAMES
        print("INSERT INTO schedule_games (id, user_id, game_names_id, region, experience, start_date_time, end_date_time, platform, description, other, expiry, visibility, `limit`, accept_msg, schedule_games_GUID, vacancy, created_at, updated_at) values (%s, %s, %s, '%s', '%s', '2019-12-01 00:00:00', '2029-12-01 00:00:00', '%s', '%s', '%s', '2025-08-08 00:00:00', %s, %s, '%s', '%s', %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (y, x, random.randint(1,1037), random.choice(sg_region), random.choice(ge_experience), random.choice(sg_platform), fake.sentence().replace("'", ""), fake.sentence().replace("'", ""), random.randint(1,4), random.choice(sg_limit), fake.sentence().replace("'", ""), fake.uuid4(), random.randint(0,1) ) )
        #This line is differnet, as it contains Media_urls
        print("INSERT INTO posts (id, user_id, content, type, media_url, created_at, updated_at) values (%s, %s, '%s', '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (y, x, fake.sentence().replace("'", ""), random.choice(post_types), random.choice(post_media_URL) ) )
        if (x != start):
          print("INSERT INTO notifications (user_id, other_user_id, activity_type, post_id, created_at, updated_at) values (%s, %s, 2, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, randrange(start, x), y ) )
          print("INSERT INTO notifications (user_id, other_user_id, activity_type, schedule_games_id, created_at, updated_at) values (%s, %s, 10, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, randrange(start, x), y ) )
          print("INSERT INTO notifications (user_id, other_user_id, activity_type, schedule_games_id, created_at, updated_at) values (%s, %s, 16, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (x, randrange(start, x), y ) )
          for i in range (tiny_start, tiny_stop, 1):
            print("INSERT INTO comments (id, post_id, user_id, content, created_at, updated_at) values (%s, %s, %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (i, y, randrange(start, x), fake.sentence().replace("'", "")  ) )
            for j in range(2):
              print("INSERT INTO replies (comment_id, user_id, content, created_at, updated_at) values (%s, %s, '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (i, randrange(start, x), fake.sentence().replace("'", "")  ) )
          tiny_start+=tiny_gap
          tiny_stop+=tiny_gap


    for d in range(x-start):
      if(adonisJS):
        print(".raw(\"INSERT INTO usergroups (group_id, user_id, permission_level, created_at, updated_at) values (%s, %s, %s, '2019-12-01 00:00:00', '2019-12-01 00:00:00')\")" % (x, randrange(start, x), random.choice(ug_permission_level) ) )
      else:
        print("INSERT INTO usergroups (group_id, user_id, permission_level, created_at, updated_at) values (%s, %s, %s, '2019-12-01 00:00:00', '2019-12-01 00:00:00');" % (x, randrange(start, x), random.choice(ug_permission_level) ) )


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
      if(adonisJS):
        print(".raw(\"INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (start, x) )
      else:
        print("INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00');" % (start, x) )
    if (myself == friend or myself == start-1 or friend == start-1):
      continue

    if(adonisJS):
      print(".raw(\"INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (myself, friend) )
    else:
      print("INSERT INTO friends (user_id, friend_id, created_at, updated_at) values (%s,%s,'2019-12-01 00:00:00','2019-12-01 00:00:00');" % (myself, friend) )

    for z in range(gap):
      if(adonisJS):
        print(".raw(\"INSERT INTO attendees (schedule_games_id, user_id, type, created_at, updated_at) values (%s, %s, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (random.randint(start+gap, mini_stop-1), myself, random.randint(1,3) ) )
      else:
        print("INSERT INTO attendees (schedule_games_id, user_id, type, created_at, updated_at) values (%s, %s, %s, '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (random.randint(start+gap, mini_stop-1), myself, random.randint(1,3) ) )

  #Loop thru all groups
  for x in range(start, stop, 1):
    #Each group gets three posts from different users
    for y in range(gap):
      if(adonisJS):
        print(".raw(\"INSERT INTO posts (user_id, group_id, content, type, created_at, updated_at) values (%s, %s, '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00')\")" % (random.randint(start, stop-1), x, fake.sentence().replace("'", ""), random.choice(post_types) ) )
      else:
        print("INSERT INTO posts (user_id, group_id, content, type, created_at, updated_at) values (%s, %s, '%s', '%s', '2019-12-01 00:00:00','2019-12-01 00:00:00');" % (random.randint(start, stop-1), x, fake.sentence().replace("'", ""), random.choice(post_types) ) )

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
