
class Server:

    def __init__(self, app):
        self.app = app
        self.DEBUG = True
        self.PORT = 8000

    def start(self):
        print('Debug:', self.DEBUG)
        print('Starting Flask server on port:', self.PORT)
        self.app.run(debug=self.DEBUG, port=self.PORT)




