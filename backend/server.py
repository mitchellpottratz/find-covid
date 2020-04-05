from flask_cors import CORS
from gevent import pywsgi

import os
from dotenv import load_dotenv

# loads the enviroment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env') 
load_dotenv(dotenv_path)


class Server:

    def __init__(self, app, login_manager, blueprints):
        self.DEBUG = False
        self.PORT = os.environ['PORT']
        self.HOST = self.set_host()
        self.ORIGIN = self.set_origin()

        self.app = app
        self.login_manager = login_manager

        self.setup_cors()
        self.register_blueprints(blueprints)


    def set_host(self):
        if self.DEBUG:
            return 'localhost'
        else:
            return os.environ['HOST']


    def set_origin(self):
        if self.DEBUG:
            return 'http://localhost:3000'
        else:
            return os.environ['ORIGIN']


    def setup_cors(self):
        CORS(self.app, resources={r"/*": {"origins": "*"}})


    def register_blueprints(self, blueprints):
        for blueprint in blueprints:
            self.app.register_blueprint(blueprint[0], url_prefix=blueprint[1])
        

    def start(self):
        print('HOST:', self.HOST)
        print('ORIGIN:', self.ORIGIN)
        print('Debug:', self.DEBUG)
        print('Starting Flask server on:', self.PORT)

        server = pywsgi.WSGIServer(
                (self.HOST, int(self.PORT)),
                self.app,
                keyfile='/etc/letsencrypt/live/sympto-map.com-0001/privkey.pem',
                certfile='/etc/letsencrypt/live/sympto-map.com-0001/cert.pem'
            )
        server.serve_forever()




