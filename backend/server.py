
class Server:

    def __init__(self, app, login_manager):
        self.app = app
        self.login_manager = login_manager
        self.DEBUG = True
        self.PORT = 8000

    def start(self):
        print('Debug:', self.DEBUG)
        print('Starting Flask server on port:', self.PORT)
        self.app.run(debug=self.DEBUG, port=self.PORT)




