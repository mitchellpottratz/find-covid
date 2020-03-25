from flask import Flask

from server import Server
from database import Database

app = Flask(__name__)

server = Server(app)
database = Database([])


if __name__ == '__main__':
    server.start()