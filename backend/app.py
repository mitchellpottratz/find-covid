from flask import Flask
from server import Server


app = Flask(__name__)

server = Server(app)


if __name__ == '__main__':
    server.start()