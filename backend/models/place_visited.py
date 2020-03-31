from .base import BaseModel
from .case import Case

from peewee import ForeignKeyField, DateField, CharField


''' 
This model represents a place a user who has been showing symptoms has visited 
in the last 7 days.
'''


class PlaceVisited(BaseModel):
    case = ForeignKeyField(Case, backref='places_visited', on_delete='CASCADE')
    date_visited = DateField()
    name = CharField(max_length=150)
    address = CharField(max_length=250)
    latitude = CharField(max_length=100)
    longitude = CharField(max_length=100)

    # stores the google id for the place so it can be search quickly
    google_place_id = CharField(max_length=100)


    









