from .base import BaseModel
from peewee import CharField, BooleanField


class User(BaseModel):
    first_name = CharField(max_length=100)
    last_name = CharField(max_length=100)
    phone_number = CharField(max_length=15)
    phone_number_confirmed = BooleanField(default=False)
    sms_confirmation_code = CharField(max_length=10)
    password = CharField(max_length=255)

    @staticmethod
    def generate_sms_confirmation_code():
        confirmation_code_list = []

        for i in range(1, 15):
            confirmation_code_list.append(str(random.randint(1, 9)))

        return ''.join(confirmation_code_list)
    








