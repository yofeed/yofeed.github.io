#!/usr/local/bin/python3.3

import feedparser
import mysql.connector as conn
import requests
import dateutil.parser as dtp
import pytz

def connectDB():
    db = conn.connect(host="mysql.server",user="alexpmil",passwd="gingerpye", database="alexpmil$yofeed")
    cur = db.cursor()
    cur.execute("""SET time_zone='America/New_York'""")
    return(db,cur)



def createTable(db, cur):
    sql = """create table feeds
    (USERNAME VARCHAR(255),
    FEED VARCHAR(2083),
    LAST_ENTRY INT)"""
    cur.execute(sql)
    db.commit()

'''
def connectDB2():
    db = conn.connect(host="mysql.server",user="alexpmil",passwd="gingerpye", database="alexpmil$oregonfootball")
    cur = db.cursor()
    cur.execute("""SET time_zone='America/New_York'""")
    return(db,cur)


def createTable2(db, cur):
    sql = """create table usernames
    (USERNAME VARCHAR(255))"""
    cur.execute(sql)
    db.commit()
'''


def update_feeds(db, cur):
    #requests.get("http://api.alex.miller.im/pushbullet?title=YOFEED Running&body=Checking feeds!")
    cur.execute("SELECT * FROM feeds")
    rows = cur.fetchall()
    for row in rows:
        print(type(row), str(row))
        USERNAME, FEED, LAST_ENTRY = row
        f = feedparser.parse(FEED)
        try:
            latest = f.entries[0].published
        except:
            latest = f.entries[0].updated
        latest = int(dtp.parse(latest).replace(tzinfo=pytz.timezone('UTC')).timestamp())

        if LAST_ENTRY == None:
            sql = """
            UPDATE feeds
            SET LAST_ENTRY={0}
            WHERE USERNAME='{1}'
            """.format(latest,USERNAME)
            print(sql)
            cur.execute(sql)
            db.commit()
        elif int(LAST_ENTRY) < latest:
            payload = {'api_token':'2d3492d2-1446-34b2-9d87-424cdb79a0a4', 'username': USERNAME, 'link': f.entries[0].link}
            r = requests.post("http://api.justyo.co/yo/", data=payload)
            if r.status_code == 200:
                print('Sent Yo to ' + USERNAME)
            else:
                print(r.text)

            sql = """
            UPDATE feeds
            SET LAST_ENTRY={0}
            WHERE USERNAME='{1}'
            """.format(latest,USERNAME)
            print(sql)
            cur.execute(sql)
            db.commit()

db, cur = connectDB()
update_feeds(db, cur)


