# This is a Script for generating the Extra Codes for the Seats Available Feature.

# Edit this to generate more or less extra seat codes.
NUMBER_OF_EXTRA_SEAT_CODES_TO_GENERATE = 100

import mysql.connector
import string
import random

def id_generator(size=11, chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))

def valid_code(current_codes):
  code = id_generator()
  if code not in current_codes:
    return code
  return valid_code(current_codes)

mydb = mysql.connector.connect(
    host="192.168.64.10",
    user="root",
    passwd="root",
    database="mygame"
)

sql_cursor = mydb.cursor()

sql_cursor.execute("select code from extra_seats_codes")
extra_seats_codes = sql_cursor.fetchall()
current_codes = [code for extra_seats_code in extra_seats_codes for code in extra_seats_code]

for index in range(NUMBER_OF_EXTRA_SEAT_CODES_TO_GENERATE):
  code_to_insert = valid_code(current_codes)
  sql_cursor.execute("INSERT INTO extra_seats_codes (code) VALUES ('MYG:%s')".replace("%s", code_to_insert))

mydb.commit()

print("Done")
