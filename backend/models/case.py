from .base import BaseModel
from .user import User

from peewee import ForeignKeyField, DateField, CharField, IntegerField, BooleanField


''' 
This model is holds information for users reporting that they have either tested 
positive or are showing symptoms.
'''

class Case(BaseModel):
    user = ForeignKeyField(User, primary_key=True)
    symptoms_date = DateField()
    address = CharField(max_length=250)
    age = IntegerField()
    has_tested = BooleanField()





