from .users import users
from .cases import cases
from .places_visited import places_visited
from .maps import maps


blueprint_list = [ 
    [users, '/api/v1/users'], 
    [cases, '/api/v1/cases'], 
    [places_visited, '/api/v1/places-visited'],
    [maps, '/api/v1/maps']
]


