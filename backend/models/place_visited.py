from .base import BaseModel
from .case import Case

from peewee import ForeignKeyField, DateField, CharField


''' 
This model represents a place a user who has been showing symptoms has visited 
in the last 7 days.
'''


class PlaceVisited(BaseModel):
    case = ForeignKeyField(Case, backref='places_visited')
    data_visited = DateField()
    name = CharField(max_length=150)
    address = CharField(max_length=250)









