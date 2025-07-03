from flask import Blueprint, request, render_template, redirect, session, flash, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from backend.services.database import get_user_by_nid, create_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        nid = request.form['nid']
        password = request.form['password']
        user = get_user_by_nid(nid)
        if user and check_password_hash(user[5], password):
            session['user'] = {
                "nid": user[1],
                "name": user[2],
                "wallet": user[3],
                "private_key": user[4]
            }
            return redirect(url_for('main.dashboard'))
        else:
            flash('Invalid credentials')
    return render_template('signin.html')

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        nid = request.form['nid']
        wallet = request.form['wallet_address']
        private_key = request.form['private_key']
        password = request.form['password']
        password_hash = generate_password_hash(password)
        
        existing_user = get_user_by_nid(nid)
        if existing_user:
            flash("User already exists")
            return redirect(url_for('auth.signup'))

        create_user(name, nid, wallet, private_key, password_hash)
        flash("Account created! Please sign in.")
        return redirect(url_for('auth.signin'))

    return render_template('signup.html')

@auth_bp.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('main.index'))
