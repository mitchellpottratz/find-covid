import os
import datetime

from peewee import SqliteDatabase, Model, BooleanField, DateTimeField



# determines if the production or dev data should be used
if os.environ['DEBUG']:
    DATABASE = SqliteDatabase('find-covid.sqlite')
else:
    DATABASE = PostgresqlDatabase(
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


        

    
