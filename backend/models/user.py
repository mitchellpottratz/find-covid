import os
import random

from .base import BaseModel
from flask_login import UserMixin

from peewee import BooleanField, CharField
from twilio.rest import Client


class User(BaseModel, UserMixin):
    first_name = CharField(max_length=100)
    last_name = CharField(max_length=100)
    phone_number = CharField(max_length=15)
    phone_number_confirmed = BooleanField(default=False)
    sms_confirmation_code = CharField(max_length=10)
    password = CharField(max_length=255)


    # removes the leading +1 from phone numbers
    @staticmethod 
    def format_phone_number(phone_number):
        return phone_number[2:]


    @staticmethod
    def generate_sms_confirmation_code():
        confirmation_code_list = []

        for i in range(1, 6):
            confirmation_code_list.append(str(random.randint(1, 9)))
            
        return ''.join(confirmation_code_list)


    def send_confirmation_sms(self):    
        twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']
        account_sid = os.environ['TWILIO_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            body = 'Thanking you for signing up for FindCovid\n\nYour account activation code is: ' + 
                   self.sms_confirmation_code,
            from_ = twilio_phone_number,
            to = self.phone_number
        )
        
