import os 
import requests

from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from playhouse.shortcuts import model_to_dict
from peewee import DoesNotExist


maps = Blueprint('maps', 'maps')


# Ping Route
@maps.route('/ping', methods=['GET'])
def ping():
    return jsonify(
        data={},
        status={
            'code': 200,
            'status': 'Resource is working.'
        }
    )


# City Autocomplete Search Route
# this route uses the google places autocomplete api to return a list of cities 
# closely matching the search_input query parameter
@maps.route('/autocomplete/city', methods=['GET'])
def autocomplete_city_search():
    try: 
        search_input = request.args.get('search_input')
                   
        response = requests.get(
            'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search_input + 
            '&types=(cities)&key=' + os.environ['GOOGLE_MAPS_API_KEY']
        )
        parsed_response = response.json()

        return jsonify(
            data=parsed_response,
            status={
                'code': 200,
                'message': 'Successfully got search suggestions'
            }
        )

    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid query parameters'
            }
        ) 


# Places Autocomplete Search Route
# this route uses the google places autocomplete api to return a list of places 
# closely matching the search_input query parameter
@maps.route('/autocomplete/places', methods=['GET'])
def autocomplete_place_search():
    try:
        search_input = request.args.get('search_input')

        response = requests.get(
            'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search_input + 
            '&types=establishment&key=' + os.environ['GOOGLE_MAPS_API_KEY']
        )
        parsed_response = response.json()

        return jsonify(
            data=parsed_response,
            status={
                'code': 200,
                'message': 'Successfully got search suggestions'
            }
        )


    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid query parameters'
            }
        ) 


# Get Places Location Route
# this route take a places id in in the query paramters and return its latitude and longitude
@maps.route('/places/location', methods=['GET'])
def get_places_details():
    try:
        google_place_id = request.args.get('google_place_id')

        response = requests.get(
            'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + google_place_id + 
            '&fields=geometry' + 
            '&key=' + os.environ['GOOGLE_MAPS_API_KEY']
        )
        parsed_response = response.json()
        print('reponse:', parsed_response)

        return jsonify(
            data=parsed_response,
            status={
                'code': 200,
                'message': 'Successfully got places details'
            }
        )

    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid query parameters'
            }
        ) 

