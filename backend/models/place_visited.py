from .base import BaseModel
from .case import Case

from peewee import ForeignKeyField, DateTimeField, CharField
from datetime import datetime, timedelta


''' 
This model represents a place a user who has been showing symptoms has visited 
in the last 7 days.
'''


class PlaceVisited(BaseModel):
    case = ForeignKeyField(Case, backref='places_visited', on_delete='CASCADE')
    date_visited = DateTimeField()
    name = CharField(max_length=150)
    address = CharField(max_length=250)
    latitude = CharField(max_length=100)
    longitude = CharField(max_length=100)

    # stores the google id for the place so it can be search quickly
    google_place_id = CharField(max_length=100)
    

    # returns the date 3 days before the current day to determine if 
    # a place visited is still at risk for covid-19
    @staticmethod
    def get_valid_date():
        current_date = datetime.today() 
        valid_date = current_date - timedelta(days=10)
        return valid_date










