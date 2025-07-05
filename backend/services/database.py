from backend import mysql
from MySQLdb.cursors import DictCursor


def get_user_by_nid(nid):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE nid = %s", (nid,))
    row = cur.fetchone()
    cur.close()
    return row

def get_admin_by_username(username):
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT * FROM admin WHERE Aname = %s", (username,))
    data = cur.fetchone()
    cur.close()
    return data


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
    cur.execute("SELECT * FROM campaigns")
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
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("""
        SELECT 
            candidates.id, 
            candidates.name, 
            candidates.wallet_address, 
            campaigns.name AS campaign_name
        FROM candidates
        JOIN campaigns ON candidates.campaign_id = campaigns.id
    """)
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

def create_campaign(name, description):
    cur = mysql.connection.cursor()
    cur.execute(
        "INSERT INTO campaigns (name, description) VALUES (%s, %s)",
        (name, description),
    )
    mysql.connection.commit()
    cur.close()

def update_campaign(campaign_id, name, description, status):
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE campaigns 
        SET name = %s, description = %s, status = %s 
        WHERE id = %s
    """, (name, description, status, campaign_id))
    mysql.connection.commit()
    cur.close()

def create_candidate(candidate_id, name, wallet_address, campaign_id):
    cur = mysql.connection.cursor()
    if candidate_id:  # manual ID
        cur.execute("""
            INSERT INTO candidates (id, name, wallet_address, campaign_id)
            VALUES (%s, %s, %s, %s)
        """, (candidate_id, name, wallet_address, campaign_id))
    else:  # auto-increment
        cur.execute("""
            INSERT INTO candidates (name, wallet_address, campaign_id)
            VALUES (%s, %s, %s)
        """, (name, wallet_address, campaign_id))
    mysql.connection.commit()
    cur.close()

def create_candidate(candidate_id, name, wallet_address, campaign_id):
    cur = mysql.connection.cursor()
    if candidate_id:  # manual ID
        cur.execute("""
            INSERT INTO candidates (id, name, wallet_address, campaign_id)
            VALUES (%s, %s, %s, %s)
        """, (candidate_id, name, wallet_address, campaign_id))
    else:  # auto-increment
        cur.execute("""
            INSERT INTO candidates (name, wallet_address, campaign_id)
            VALUES (%s, %s, %s)
        """, (name, wallet_address, campaign_id))
    mysql.connection.commit()
    cur.close()

def delete_candidate_by_id(candidate_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM candidates WHERE id = %s", (candidate_id,))
    mysql.connection.commit()
    cur.close()

def delete_campaign_and_candidates(campaign_id):
    cur = mysql.connection.cursor()
    
    # Delete candidates associated with the campaign
    cur.execute("DELETE FROM candidates WHERE campaign_id = %s", (campaign_id,))
    
    # Delete the campaign itself
    cur.execute("DELETE FROM campaigns WHERE id = %s", (campaign_id,))
    
    mysql.connection.commit()
    cur.close()
