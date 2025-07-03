import os
from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from .routes.admin import admin_bp
from .routes.result import result_bp
from .routes.contract_info import contract_info_bp

# Load env vars
load_dotenv()

mysql = MySQL()

def create_app():
    app = Flask(__name__)

    # Load config directly from env
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "dev_key")
    app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST", "localhost")
    app.config['MYSQL_USER'] = os.getenv("MYSQL_USER", "root")
    app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD", "")
    app.config['MYSQL_DB'] = os.getenv("MYSQL_DB", "voting_system")

    mysql.init_app(app)

    # Register routes
    from .routes.auth import auth_bp
    from .routes.campaign import campaign_bp
    from .routes.vote import vote_bp
    from .routes.main import main_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(campaign_bp, url_prefix='/campaigns')
    app.register_blueprint(vote_bp, url_prefix='/vote')
    app.register_blueprint(admin_bp)
    app.register_blueprint(result_bp)
    app.register_blueprint(contract_info_bp)
    return app
