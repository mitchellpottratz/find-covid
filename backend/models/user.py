import os
import random

import uuid

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
    password_token = CharField(max_length=35)


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

    # sends password-reset url + randomly generated key
    def send_password_confirmation_sms(sending_phone_number, recieving_phone_number):    
        twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']
        account_sid = os.environ['TWILIO_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        random_password_token = uuid.uuid4()
        random_password_token_to_string = str(random_password_token)

        message = client.messages.create(
            body = 'Click the link below to Update Password\n\n: ' + 
                   'http://localhost:3000/reset-password/' + random_password_token_to_string,
            from_ = twilio_phone_number,
            to = recieving_phone_number
        )
