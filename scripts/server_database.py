# This is a Script for loading the database with some info.
# sudo apt-get install python3-mysql.connector
# password: mygame
import mysql.connector

mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    passwd="jordan",
    database="mygame"
)

print("Starting")
sql_cursor = mydb.cursor()

# Users

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (1, 'john', 'John', 'Alabama', 'john@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (2, 'jack', 'Jack', 'Alaska', 'jack@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (3, 'josh', 'Josh', 'Arizona', 'josh@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'online', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (4, 'jason', 'Jason', 'Arkansas', 'jason@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (5, 'jimmy', 'Jimmy', 'California', 'jimmy@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (6, 'jonas', 'Jonas', 'Colorado', 'jonas@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'playing', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (7, 'jacob', 'Jacob', 'Connecticut', 'jacob@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'afk', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (8, 'joseph', 'Joseph', 'Delaware', 'joseph@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'afk', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (9, 'joel', 'Joel', 'Florida', 'joel@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'offline', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO users (id, alias, first_name, last_name, email, password, profile_img, status, last_seen, public_key, created_at, updated_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
val = (10, 'johnatan', 'Johnatan', 'Georgia', 'johnatan@mygame.com', '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm', 'https://cdn.myG.gg/default_user/new-user-profile-picture.png', 'offline', '2019-12-01 00:00:00', 'lVxjAuGfXnA3KewnMfxuT91Wnz2nqW5XY1kYxrJWlxY41Nm2wmYcSXdsj+35gUAxFL/n/d7azGuX4uks1h+BsB5Z5d0FGSbAhhOpfKcvlrc7DvHISNEFN3jTh9DDa+ClpmBnQ7mz79fWQS2EzFhzactKpNVteL2xNy9uNK9AHKs=', '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

# Friends

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (1, 1, 2, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (2, 1, 3, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (3, 1, 4, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (4, 1, 5, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (5, 1, 6, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (6, 1, 7, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (7, 1, 8, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (8, 1, 9, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (9, 1, 10, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (10, 2, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (11, 3, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (12, 4, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (13, 5, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (14, 6, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (15, 7, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (16, 8, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (17, 9, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

sql = "INSERT INTO friends (id, user_id, friend_id, created_at, updated_at) VALUES (%s,%s,%s,%s,%s)"
val = (18, 10, 1, '2019-12-01 00:00:00', '2019-12-01 00:00:00')
sql_cursor.execute(sql, val)

mydb.commit()

print("Done")
