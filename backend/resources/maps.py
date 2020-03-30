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
    