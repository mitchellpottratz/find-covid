import os
import datetime

from peewee import (SqliteDatabase, PostgresqlDatabase, Model,
                    BooleanField, DateTimeField)

DEBUG = False

# determines if the production or dev data should be used
if DEBUG:
    DATABASE = SqliteDatabase('find-covid.sqlite')
else:
    DATABASE = PostgresqlDatabase(
        os.environ['DB_NAME'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        host=os.environ['DB_HOST']
    )

''' 
All models inherit from this model
'''

class BaseModel(Model):
    soft_delete = BooleanField(default=False)
    last_updated = DateTimeField(default=datetime.datetime.now)
    timestamp = DateTimeField(default=datetime.datetime.now)

    class Meta: 
        database = DATABASE


        

    
