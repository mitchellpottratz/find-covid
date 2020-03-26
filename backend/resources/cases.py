from flask import request, jsonify, Blueprint

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






