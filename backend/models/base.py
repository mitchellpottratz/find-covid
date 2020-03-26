from peewee import SqliteDatabase, Model, BooleanField, DateTimeField
import datetime

DATABASE = SqliteDatabase('find-covid.sqlite')

''' 
All models inherit from this model
'''

class BaseModel(Model):
    soft_delete = BooleanField(default=False)
    last_updated = DateTimeField(default=datetime.datetime.now)
    timestamp = DateTimeField(default=datetime.datetime.now)

    class Meta: 
        database = DATABASE


        

    
