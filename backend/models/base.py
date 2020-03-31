import os
import datetime

from playhouse.db_url import connect
from peewee import *
            

DEBUG = False

# determines if the production or dev data should be used
if DEBUG:
    DATABASE = SqliteDatabase('find-covid.sqlite')
else:
    DATABASE = connect(os.environ['DB_URL'])

''' 
All models inherit from this model
'''

class BaseModel(Model):
    soft_delete = BooleanField(default=False)
    last_updated = DateTimeField(default=datetime.datetime.now)
    timestamp = DateTimeField(default=datetime.datetime.now)

    class Meta: 
        database = DATABASE


        

    
