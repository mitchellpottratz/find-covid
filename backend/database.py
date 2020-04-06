import os
from peewee import *
from playhouse.db_url import connect


class Database:

    def __init__(self, db_tables):
        self.DEBUG = False
        self.DATABASE = self.set_database()
        self.db_tables = db_tables


    def set_database(self):
        if self.DEBUG:
            print('Using SQLite DB')
            return SqliteDatabase('find-covid.sqlite')
        else:
            print('Using Production DB')
            return connect(os.environ['DB_URL'])
        


    def initialize_tables(self):
        self.DATABASE.connect()
        self.DATABASE.create_tables(self.db_tables)
        self.DATABASE.close()
