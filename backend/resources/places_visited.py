import os
import requests

from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist
from datetime import datetime

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


# Index Route
# this route returns all the places that have been visited by people reporting symptoms
@places_visited.route('/', methods=['GET'])
def get_all_places_visited():

    # places visited before this date will not be shown on the map
    valid_place_visited_date = PlaceVisited.get_valid_date()

    all_places_visited = PlaceVisited.select(
        PlaceVisited.google_place_id
    ).distinct().where(
        PlaceVisited.date_visited > valid_place_visited_date 
    ).select(
        PlaceVisited.case, 
        PlaceVisited.latitude,
        PlaceVisited.longitude,
        PlaceVisited.name,
        PlaceVisited.date_visited,
        PlaceVisited.address,
        PlaceVisited.google_place_id,
        PlaceVisited.last_updated,
        PlaceVisited.timestamp,
        PlaceVisited.id
    )
    
    places_visited_dicts = []
    for place_visited in all_places_visited:
        place_dict = model_to_dict(place_visited)
        del place_dict['case']['user']
        places_visited_dicts.append(place_dict)
    
    return jsonify(
        data=places_visited_dicts,
        status={
            'code': 200,
            'message': 'Successfully got places visited'
        }
    )



# Show Route
# this route takes a google place id as a query parameter and returns all 
# reported cases of infected people visiting their 
@places_visited.route('/<google_place_id>', methods=['GET'])
def get_place(google_place_id):
    all_cases = PlaceVisited.select().where(PlaceVisited.google_place_id == google_place_id)

    # converts all the models to dictionaries and removes the users information
    all_cases_dicts = []
    for case in all_cases: 
        case_dict = model_to_dict(case)
        del case_dict['case']['user']
        all_cases_dicts.append(case_dict)

    return jsonify(
        data=all_cases_dicts,
        status={
            'code': 200,
            'messages': 'Got all the cases for this place'
        }
    )    

  
   


# Get Place Information Route
# this route uses the google places api to get information about a place using the place id
@places_visited.route('/<google_place_id>/details', methods=['GET'])
def get_place_details(google_place_id):
    response = requests.get(
        'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + google_place_id + 
        '&fields=name,rating,formatted_phone_number' + 
        '&key=' + os.environ['GOOGLE_MAPS_API_KEY']
    )
    parsed_response = response.json()

    return jsonify(
        data=parsed_response,
        status={
            'code': 200,
            'message': 'Successfully got places information'
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
        latitude = data['latitude']
        longitude = data['longitude']
        google_place_id = data['google_place_id']

        try:    
            users_case = Case.get(Case.user == current_user.id)

            new_place_visited = PlaceVisited.create(
                case=users_case.user.id,
                date_visited=date_visited,
                name=name,
                address=address,
                latitude=latitude,
                longitude=longitude,
                google_place_id=google_place_id
            )

            new_place_visited_dict = model_to_dict(new_place_visited)
            del new_place_visited_dict['case']['user']

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


# Delete Route
# this route is where a user can delete on of the places they have visited
@places_visited.route('/<place_id>', methods=['DELETE'])
@login_required
def delete_place_visited(place_id):
    try:
        place_visited = PlaceVisited.get(PlaceVisited.id == place_id)

        # verifies the user is the owner of the case 
        if place_visited.case.user.id == current_user.id:
            place_visited.delete_instance()

            return jsonify(
                data={},
                status={
                    'code': 204,
                    'message': 'Successfully deleted the place.'    
                }
            )

        # if the user is not the owner of the place visited
        else:
            return jsonify(
                data={},
                status={
                    'code': 401,
                    'message': 'Resource access denied'
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







