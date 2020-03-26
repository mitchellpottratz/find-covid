from flask import request, jsonify, Blueprint

from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist
from flask_bcrypt import generate_password_hash
from flask_login import login_user

from models.user import User


users = Blueprint('users', 'users')


# Ping Route
@users.route('/ping', methods=['GET'])
def ping():
    return jsonify(
        data={},
        status={
            'code': 200,
            'message': 'Resource is working'
        }
    )


# Registration Route
@users.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # verifies the request body is valid
        first_name = data['first_name'] 
        last_name = data['first_name'] 
        phone_number = data['phone_number']
        password = data['password']

        try:
            user = User.get(User.phone_number == phone_number, User.soft_delete == False)

            return jsonify(
                data={},
                status={
                    'code': 409,
                    'message': 'Phone number already exists'
                }
            )

        # thrown if the provided phone number does not already exist
        except DoesNotExist:
            sms_confirmation_code = User.generate_sms_confirmation_code()
            password_hash = generate_password_hash(password)

            new_user = User.create(
                first_name=first_name,
                last_name=last_name,
                phone_number=phone_number,
                sms_confirmation_code=sms_confirmation_code,
                password=password_hash
            )

            # sends twilio phone number confirmation text message 
            new_user.send_confirmation_sms()

            login_user(new_user)

            new_user_dict = model_to_dict(new_user)
            del new_user_dict['sms_confirmation_code']   
            del new_user_dict['password']

            return jsonify(
                data=new_user_dict,
                status={
                    'code': 201,
                    'message': 'New user created'
                }
            ) 

    # thrown if the request body is not valid
    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid request body'
            }
        )

    
    
