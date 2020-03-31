import os
from peewee import SqliteDatabase, PostgresqlDatabase


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
            print('Using Postgres DB')
            return PostgresqlDatabase(
                'sympto-map-db',
                user=os.environ['DB_USER'],
                password=os.environ['DB_PASSWORD'],
                host=os.environ['DB_HOST']
            )


    def initialize_tables(self):
        self.DATABASE.connect()
        self.DATABASE.create_tables(self.db_tables)
        self.DATABASE.close()
