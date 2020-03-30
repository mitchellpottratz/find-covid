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
