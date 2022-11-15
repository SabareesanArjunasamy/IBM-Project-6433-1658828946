import ibm_db
import os
dsn_hostname = "0c77d6f2-5da9-48a9-81f8-86b520b87518.bs2io90l08kqb1od8lcg.databases.appdomain.cloud"
dsn_uid = "bsj69971"        # e.g. "abc12345"
dsn_pwd = "J0ww1ELveoQeDVWK"      # e.g. "7dBZ3wWt9XN6$o0J"

dsn_driver = "{IBM DB2 ODBC DRIVER}"
dsn_database = "BLUDB"            # e.g. "BLUDB"
dsn_port = "31198"                # e.g. "32733" 
dsn_protocol = "TCPIP"            # i.e. "TCPIP"
dsn_security = "SSL"              #i.e. "SSL"

dsn = (
    "DRIVER={0};"
    "DATABASE={1};"
    "HOSTNAME={2};"
    "PORT={3};"
    "PROTOCOL={4};"
    "UID={5};"
    "PWD={6};"
    "SECURITY={7};").format(dsn_driver, dsn_database, dsn_hostname, dsn_port, dsn_protocol, dsn_uid, dsn_pwd,dsn_security)


conn = ibm_db.pconnect(dsn, "", "")

def authenticate(username, password):
    stmt = ibm_db.exec_immediate(conn, "SELECT * FROM USERS")
    row = True
    while row!= False:
        row = ibm_db.fetch_assoc(stmt)
        if not row: return False
        if(row['USERNAME'] == username and row['PASSWORD'] == password):
            return True
    return False

def get_user(username):
    stmt = ibm_db.exec_immediate(conn, "SELECT * FROM USERS")
    row = True
    while row!= False:
        row = ibm_db.fetch_assoc(stmt)
        if not row: return False
        if(row['USERNAME'] == username):
            return dict(row)
    return dict()

def create_account(name, username, password, phone, dob, topics):
    try:
        sql = "INSERT INTO USERS VALUES(?,?,?,?,?,?)"
        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, name)
        ibm_db.bind_param(stmt, 2, username)
        ibm_db.bind_param(stmt, 3, password)
        ibm_db.bind_param(stmt, 4, phone)
        ibm_db.bind_param(stmt, 5, dob)
        ibm_db.bind_param(stmt, 6, ','.join(topics))
        ibm_db.execute(stmt)
        return True
    except:
        return False

def get_likes(user):
    stmt = ibm_db.exec_immediate(conn, "SELECT * FROM NEWS N where N.user='{0}' and news_type='S'".format(user))
    likes = []
    row = True
    while row!= False:
        row = ibm_db.fetch_assoc(stmt)
        if not row: break
        likes.append(dict(row))
    return likes

def get_bookmarks(user):
    stmt = ibm_db.exec_immediate(conn, "SELECT * FROM NEWS N where N.user='{0}' and news_type='B'".format(user))
    bookmarks = []
    row = True
    while row!= False:
        row = ibm_db.fetch_assoc(stmt)
        if not row: break
        bookmarks.append(dict(row))
    return bookmarks

def get_topics(user):
    stmt = ibm_db.exec_immediate(conn, "SELECT * FROM USERS where username='{0}'".format(user))
    row = True
    while row!= False:
        row = ibm_db.fetch_assoc(stmt)
        if not row: break
        return row['TOPICS'].split(',')
    return []

def update_topics(user, topics):
    sql = "UPDATE USERS SET topics=? where username=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, ','.join(topics))
    ibm_db.bind_param(stmt, 2, user)
    ibm_db.execute(stmt)

def add_action(user, title, url, image_url, date, desc, action):
    try:
        sql = "INSERT INTO NEWS VALUES(?,?,?,?,?,?,?)"
        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, user)
        ibm_db.bind_param(stmt, 2, title)
        ibm_db.bind_param(stmt, 3, url)
        ibm_db.bind_param(stmt, 4, image_url)
        ibm_db.bind_param(stmt, 5, date)
        ibm_db.bind_param(stmt, 6, desc)
        ibm_db.bind_param(stmt, 7, action)
        ibm_db.execute(stmt)
        return True
    except Exception as e:
        print(e)
        return False

def remove_action(user, url):
    try:
        sql = "DELETE FROM NEWS N WHERE N.user='{0}' AND news_article_link='{1}'".format(user, url)
        ibm_db.exec_immediate(conn, sql)
        return True
    except Exception as e:
        print(e)
        return False


