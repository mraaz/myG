# This is a Script for loading the database with some info.

import mysql.connector

mydb = mysql.connector.connect(
    host="192.168.99.102",
    user="root",
    passwd="root",
    database="mygame"
)

sql_cursor = mydb.cursor()

# Users

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (2, 'jack', 'Jack', 'Alaska', 'jack@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (3, 'josh', 'Josh', 'Arizona', 'josh@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (4, 'jason', 'Jason', 'Arkansas', 'jason@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (5, 'jimmy', 'Jimmy', 'California', 'jimmy@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (6, 'jonas', 'Jonas', 'Colorado', 'jonas@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (7, 'jacob', 'Jacob', 'Connecticut', 'jacob@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'afk', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (8, 'joseph', 'Joseph', 'Delaware', 'joseph@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'afk', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (9, 'joel', 'Joel', 'Florida', 'joel@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'offline', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (10, 'johnatan', 'Johnatan', 'Georgia', 'johnatan@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'offline', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (11, 'john', 'John', 'Alabama', 'john@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

# Friends

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (1, 11, 2, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (2, 11, 3, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (3, 11, 4, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (4, 11, 5, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (5, 11, 6, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (6, 11, 7, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (7, 11, 8, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (8, 11, 9, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (9, 11, 10, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (10, 2, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (11, 3, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (12, 4, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (13, 5, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (14, 6, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (15, 7, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (16, 8, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (17, 9, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (18, 10, 11, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

# Games
# update game_name_fields set in_game_fields = "{\"value_one\": \"lol_server_regions\", \"value_two\": \"lol_ranks\", \"value_three\": \"lol_roles\", \"value_six\": \"stats_link\"}" where game_names_id = 999;
# update game_name_fields set in_game_field_placeholders = "{\"lol_server_regions\": \"Select what region/s you can play\", \"lol_ranks\": \"Please advise what Rank/s you are looking for?\", \"lol_roles\": \"Select the role/s you wish to apply for\", \"stats_link\": \"https://www.leagueofgraphs.com/summoner/region/profile-id\"}" where game_names_id = 999;
# update game_name_fields set in_game_field_types = "{\"lol_server_regions\": \"Multi\", \"lol_ranks\": \"Multi\", \"lol_roles\": \"Multi\", \"stats_link\": \"Input\"}" where game_names_id = 999;
# update game_name_fields set in_game_field_labels = "{\"lol_server_regions\": \"Server Regions\", \"lol_ranks\": \"Ranks\", \"lol_roles\": \"Roles\", \"stats_link\": \"Profile Link\"}" where game_names_id = 999;
# update game_name_fields set in_game_field_values = "{\"lol_ranks\": \"Iron I, Iron II, Iron III, Iron IV, Bronze I, Bronze II, Bronze III, Bronze IV, Silver I, Silver II, Silver III, Silver IV, Gold I, Gold II, Gold III, Gold IV, Platinum I, Platinum II, Platinum III, Platinum IV, Diamond I, Diamond II, Diamond III, Diamond IV, Master, Grandmaster, Challenger\", \"lol_server_regions\": \"North America, Europe West, Europe East, Oceania, South East Asia, Latin America North, Latin America South, Brazil, Russia, Turkey, Japan, Corea\" , \"lol_roles\": \"Top, Jungle, Mid, ADC, Support\", \"stats_link\": \"^https://www.leagueofgraphs.com/summoner,true\"}" where game_names_id = 999;

mydb.commit()

print("Done")


