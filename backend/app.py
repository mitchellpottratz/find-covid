from flask import Flask, g
from flask_login import LoginManager

from server import Server
from database import Database

from models import models_list

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

server = Server(app, login_manager)
database = Database(models_list)


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