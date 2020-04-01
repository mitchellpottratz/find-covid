from flask import request, jsonify, Blueprint, session

from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, current_user, logout_user

from models.user import User
from models.case import Case
from models.place_visited import PlaceVisited


users = Blueprint('users', 'users')

print('in users controller')

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
            session['logged_in'] = True
            print('current user:', current_user)
            print('current user id:', current_user.id)
            print('is authenticated:', current_user.is_authenticated)
          
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


# Login Route
@users.route('/login', methods=['POST'])
def login():
    try:
        print('request:', request)
        data = request.get_json()

        phone_number = data['phone_number'] 
        password = data['password']
        
        try:
            user = User.get(User.phone_number == phone_number)

            if check_password_hash(user.password, password):
                login_user(user)
                print('current user:', current_user)
                print('current user id:', current_user.id)
                print('session:', session)
                print('is autheticated:', current_user.is_authenticated)

                user_dict = model_to_dict(user)
                del user_dict['sms_confirmation_code']
                del user_dict['password']

                try:
                    users_case = Case.get(Case.user_id == user.id)
                    places_visited = PlaceVisited.select().where(PlaceVisited.case == user.id)

                    # converts all the places the user visited to a dictonary and 
                    # removes the case field
                    places_visited_dicts = []
                    for place in places_visited:
                        place_dict = model_to_dict(place)
                        del place_dict['case']
                        places_visited_dicts.append(place_dict)

                    users_case_dict = model_to_dict(users_case)
                    del users_case_dict['user']
        
                    users_case_dict['places_visited'] = places_visited_dicts
                    user_dict['case'] = users_case_dict

                except DoesNotExist:
                    pass 

                return jsonify(
                    data=user_dict,
                    status={
                        'code': 200,
                        'message': 'Successfully logged in'
                    }
                )
            else:
                raise DoesNotExist

        except DoesNotExist: 
            return jsonify(
                data={},
                status={
                    'code': 404,
                    'message': 'Phone number or password is incorrect'
                }
            )

    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid request body'
            }
        )


# Logout Route
@users.route('/logout', methods=['POST'])
#@login_required
def logout():
    print('request:', request)
    logout_user()

    return jsonify(
        data={},
        status={
            'code': 200,
            'message': 'Successfully logged out'
        }
    )


# Confirm Phone Number Route
# this is where users confirm there 
@users.route('/confirm-number', methods=['PUT'])
@login_required
def confirm_phone_number():
    try:
        data = request.get_json()
        confirmation_code = data['confirmation_code']

        # if the confirmation code is correct 
        if current_user.sms_confirmation_code == confirmation_code:
            current_user.phone_number_confirmed = True
            current_user.save()

            return jsonify(
                data={},
                status={
                    'code': 204,
                    'message': 'Successfully confirmed phone number'
                }
            )   
        # if the confirmation code was incorrect    
        else:
            return jsonify(
                data={},
                status={
                    'code': 404,
                    'message': 'Incorrect confirmation code'
                }
            )
            
    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid request body'
            }
        )


# Send New Text Message Confirmation Route
# this is where a user can request to send another email confirmation code
@users.route('/new-confirmation-code', methods=['PUT'])
@login_required
def send_new_confirmation_code():
    current_user.sms_confirmation_code = User.generate_sms_confirmation_code()
    current_user.save()

    # sends a new confirmation text message
    current_user.send_confirmation_sms()

    return jsonify(
        data={},
        status={
            'code': 204,
            'message': 'Resent phone number confirmation code'
        }
    )







    

    
    
