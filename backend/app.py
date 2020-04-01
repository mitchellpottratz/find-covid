import os
from flask import Flask, g
from flask_login import LoginManager
from peewee import DoesNotExist

from server import Server
from database import Database

from models import models_list
from resources import blueprint_list

# User model needs to be import seperately since its used in the load_user function
from models.user import User 


app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']



login_manager = LoginManager()
login_manager.init_app(app)

server = Server(app, login_manager, blueprint_list)
database = Database(models_list)


# required by flask_login for loading users
@login_manager.user_loader
def load_user(user_id):
    try:
        return User.get(User.id == user_id)
    except DoesNotExist:
        return None


@app.before_request
def before_request():
    g.db = database.DATABASE
    g.db.connect()


@app.after_request
def after_request(response):
    g.db.close()
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    database.initialize_tables()
    server.start()





