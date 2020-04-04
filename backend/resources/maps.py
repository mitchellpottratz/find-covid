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
        google_api_key = os.environ['GOOGLE_MAPS_API_KEY']
        search_input = request.args.get('search_input')

        # if 'ipbias' is a query parameter then the request to the google places api uses location biasing
        # based off the users ip address
        if request.args.get('zip_code') is not None:    

            response = requests.get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search_input + 
                '&locationbias=ipbias&types=establishment&key=' + google_api_key
            )
            parsed_response = response.json()
            print('response:', parsed_response)

            return jsonify(
                data=parsed_response,
                status={
                    'code': 200,
                    'message': 'Successfully got search suggestions'
                }
            )

        # if 'ipbias' is NOT a query parameter then the latitude and longitude are passed as query parameters 
        # to the google places api for location biasing
        else:
            latitude = request.args.get('latitude')
            longitude = request.args.get('longitude')

            response = requests.get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search_input + 
                '&location=' + latitude + ',' + longitude + '&radius=' + str(150) + 
                '&types=establishment&key=' + google_api_key
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


# Get Zip Codes Location Route
# this route takes a zip code as a query paramter and returns the latitude and longitude 
# if the zip code
@maps.route('/zip-code/location', methods=['GET'])
def get_zip_codes_location():
    try:
        google_api_key = os.environ['GOOGLE_MAPS_API_KEY']
        zip_code = request.args.get('zip_code')

        api_url = (
            'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip_code + 
            '&key=' + google_api_key
        )

        response = requests.get(api_url)
        parsed_response = response.json()

        location = parsed_response['results'][0]['geometry']['location']
        latitude = location['lat']
        longitude = location['lng']

        response_body = {
            'latitude': latitude,
            'longitude': longitude
        }

        return jsonify(
            data=response_body,
            status={
                'code': 200,
                'message': 'Successfully got latitude and longitude for the zip code'
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

