import os
from dotenv import load_dotenv

# loads the enviroment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env') 
load_dotenv(dotenv_path)


class Server:

    def __init__(self, app, login_manager):
        self.app = app
        self.login_manager = login_manager
        self.DEBUG = os.environ['DEBUG']
        self.PORT = os.environ['PORT']

    def start(self):
        print('Debug:', self.DEBUG)
        print('Starting Flask server on port:', self.PORT)
        self.app.run(debug=self.DEBUG, port=self.PORT)




