from .base import BaseModel
from peewee import CharField


class User(BaseModel):
    first_name = CharField(max_length=100)
    last_name = CharField(max_length=100)
    phone_number = CharField(max_length=15)
    sms_confirmation_code = CharField(max_length=10)
    password = CharField(max_length=255)










