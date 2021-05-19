# This is a Script for santising the myG DB. So that all emails are scrubbed


import mysql.connector
import string
import random

def id_generator(size=11, chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))

def update_email(email, id):
    code = id_generator()
    start = email.find('@') + 1
    if (start != 0):
      end = email.find('.', start)
    else:
      end = 5
    
    if (end > 20 ):
        end = 20

    code = ("%s%s%s@%s%s.com" % (id, code, id, email[start:end].replace("/", "") ,id))
    mystr = ("update users set email = '%s' where id = %s;" % (code, id))
    sql_cursor.execute(mystr)


def update_password(id):
    mystr = ("update users set password = '$2a$10$JTLVsD59n1jZPN3yGIn.4OUNR0EBRSiT1JrHllsyL0.pz2hh994hm' where id = %s;" % (id))
    sql_cursor.execute(mystr)

def update_first_name(id):
    mystr = ("update users set first_name = 'John_%s' where id = %s;" % (id, id))
    sql_cursor.execute(mystr)

def update_last_name(id):
    mystr = ("update users set last_name = 'Doe_%s' where id = %s;" % (id, id))
    sql_cursor.execute(mystr)       

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="jordan",
    database="mygame"
)

sql_cursor = mydb.cursor()

sql_cursor.execute("select id, email, password, first_name, last_name from users")
all_users = sql_cursor.fetchall()

for x in all_users:
    counter = 0
    this_recordset={}
    for e in x:
        if counter == 0:
            this_recordset.update({"id": e})
            update_password(e)
        if counter == 1:
            this_recordset.update({"email": e})
            update_email(e, this_recordset["id"])
        if counter == 2:
            this_recordset.update({"first_name": e})
            update_first_name(this_recordset["id"])
        if counter == 3:
            this_recordset.update({"last_name": e})
            update_last_name(this_recordset["id"])
        counter = counter + 1


mydb.commit()

print("Done")
