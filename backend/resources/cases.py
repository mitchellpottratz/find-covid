from flask import request, jsonify, Blueprint

from flask_login import login_required, current_user
from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist

from models.case import Case
from models.place_visited import PlaceVisited


cases = Blueprint('cases', 'cases')


# Ping Route
@cases.route('/ping', methods=['GET'])
def ping():
    return jsonify(
        data={},
        status={
            'code': 200,
            'message': 'Resource is working'
        }
    )


# Show Route
# this route is where a user can view a case they have reported
@cases.route('/<user_id>', methods=['GET'])
@login_required
def get_one_case(user_id):
    try:
        case = Case.get(Case.user == user_id)

        case_dict = model_to_dict(case)
        del case_dict['user']['password']

        return jsonify(
            data=case_dict,
            status={
                'code': 200,
                'message': 'Successfully found users case'
            }
        )

    except DoesNotExist:
        return jsonify(
            data={},
            status={
                'code': 404,
                'message': 'Resource does not exist'
            }
        )


# Create Route
# this route is where a user can create a case model to report their symptoms, 
# if they have been test and the places they have visited
@cases.route('/', methods=['POST'])
@login_required
def create_case():
    try:
        data = request.get_json()

        symptoms_date = data['symptoms_date']
        zip_code = data['zip_code']
        age = data['age']
        has_tested = data['has_tested']
        notes = data['notes']

        try:
            case = Case.get(Case.user == current_user.id)
        
            return jsonify(
                data={},
                status={
                    'code': 409,
                    'message': 'User has already reported their symptoms'
                }
            )

        # continues to create a new case after its been verified this user has not already created one
        except DoesNotExist:

            # creates a new case reporting users symptoms and whether they 
            # have been tested
            new_case = Case.create(
                user=current_user.id,
                symptoms_date=symptoms_date,
                zip_code=zip_code,
                age=age,
                has_tested=has_tested,
                notes=notes
            )   

        new_case_dict = model_to_dict(new_case)
        del new_case_dict['user']['password']

        return jsonify(
            data=new_case_dict,
            status={
                'code': 201,
                'message': 'Users case has been recorded'
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







