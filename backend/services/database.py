from backend import mysql
from MySQLdb.cursors import DictCursor


def get_user_by_nid(nid):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE nid = %s", (nid,))
    row = cur.fetchone()
    cur.close()
    return row


def create_user(name, nid, password_hash):
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO users (name, nid, password_hash) VALUES (%s, %s, %s)",
        (name, nid, password_hash),
    )
    mysql.connection.commit()
    cur.close()


def get_all_campaigns():
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT id, name FROM campaigns")
    data = cur.fetchall()
    cur.close()
    return data


def get_candidates_by_campaign(campaign_id):
    cur = mysql.connection.cursor(DictCursor)
    cur.execute(
        "SELECT id, name, wallet_address FROM candidates WHERE campaign_id = %s",
        (campaign_id,),
    )
    data = cur.fetchall()
    cur.close()
    return data


def get_campaign_by_id(campaign_id):
    cur = mysql.connection.cursor(DictCursor)
    cur.execute(
        "SELECT id, name FROM campaigns WHERE id = %s",
        (campaign_id,),
    )
    row = cur.fetchone()
    cur.close()
    return row  


def get_all_candidates():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM candidates")
    candidates = cur.fetchall()
    cur.close()
    return candidates


def update_user_wallet(user_id, wallet_address):
    cur = mysql.connection.cursor()
    cur.execute(
        "UPDATE users SET wallet_address = %s WHERE nid = %s",
        (wallet_address, user_id)
    )
    mysql.connection.commit()
    cur.close()
