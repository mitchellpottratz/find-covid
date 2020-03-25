from peewee import SqliteDatabase


class Database:

    def __init__(self, db_tables):
        self.DATABASE = SqliteDatabase('find-covid.sqlite')
        self.db_tables = db_tables

    def initialize_tables(self):
        self.DATABASE.connect()
        self.DATABASE.create_tables(self.db_tables)
        self.DATABASE.close()