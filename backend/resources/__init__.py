from .users import users
from .cases import cases

blueprint_list = [ [users, '/api/v1/users'], [cases, '/api/v1/cases'] ]


