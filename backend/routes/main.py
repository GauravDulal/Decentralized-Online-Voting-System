from flask import Blueprint, render_template, session
from backend.services.blockchain import load_contract, get_vote_counts
from backend.services.database import get_all_candidates

main_bp = Blueprint("main", __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/dashboard')
def dashboard():
    if "user" not in session:
        return render_template('index.html')
    return render_template('dashboard.html')

@main_bp.route('/results')
def result():
    if "user" not in session:
        return render_template('index.html')
    return render_template('results.html')

@main_bp.route('/notices')
def notices():
    if "user" not in session:
        return render_template('index.html')
    return render_template('notices.html')

@main_bp.route('/election')
def election():
    if "user" not in session:
        return render_template('index.html')
    return render_template('elections.html')


