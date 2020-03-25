from flask import request, jsonify, Blueprint
from peewee import DoesNotExist


users = Blueprint('users', 'users')


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

        


    # thrown if the request body is not valid
    except KeyError:
        return jsonify(
            data={},
            status={
                'code': 422,
                'message': 'Invalid request body'
            }
        )
    
