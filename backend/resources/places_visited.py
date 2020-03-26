from flask import request, jsonify, Blueprint

from flask_login import login_required, current_user
from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist

from models.case import Case
from models.place_visited import PlaceVisited


places_visited = Blueprint('places_visited', 'places_visited')


# Ping Route
@places_visited.route('/ping', methods=['GET'])
@login_required
def ping():
    return jsonify(
        data={},
        status={
            'code': 200,
            'message': 'Resource is working'
        }
    )



# Create Route
# this route is where a user can add places they have visited in the last 
# 7 days of showing symptoms
@places_visited.route('/', methods=['POST'])
@login_required
def create_place_visited():
    try:
        data = request.get_json()

        date_visited = data['date_visited']
        name = data['name']
        address = data['address']

        try:    
            users_case = Case.get(Case.user == current_user.id)

            new_place_visited = PlaceVisited.create(
                case=users_case.user.id,
                date_visited=date_visited,
                name=name,
                address=address
            )

            new_place_visited_dict = model_to_dict(new_place_visited)
            del new_place_visited_dict['case']['user']['password']

            return jsonify(
                data=new_place_visited_dict,
                status={
                    'code': 201,
                    'message': 'Successfully created a new visited place.'
                }
            )

        # raised if the user has not created a case yet
        except DoesNotExist:
            return jsonify(
                data={},
                status={
                    'code': 404,
                    'message': 'Resource does not exist'
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






