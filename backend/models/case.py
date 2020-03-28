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
    zip_code = CharField(max_length=10)
    age = IntegerField()
    has_tested = BooleanField()
    notes = CharField(max_length=100, null=True)






