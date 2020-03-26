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




