from flask import Flask, g

from server import Server
from database import Database

app = Flask(__name__)

server = Server(app)
database = Database([])


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
    server.start()