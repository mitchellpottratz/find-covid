import apiURL from './config.js';


export default {

    // call the api to get all of the places to display on the map
    getPlacesOnMap: async () => {
        try {
            const response = await fetch(apiURL + 'places-visited/');
            const parsedResponse = await response.json();
            return parsedResponse;   

        } catch (error) {
            console.log('error occured getting places on the map:', error);
        }
    },

    // makes api call for the user to create a new place they have visited 
    createUsersPlaceVisited: async (placeVisitedInfo) => {
        try {
            const response = await fetch(apiURL + 'places-visited/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(placeVisitedInfo),
            });
            const parsedResponse = await response.json();
            return parsedResponse;   

        } catch (error) {
            console.log('error occured while creating place visited:', error);
        }
    },

    // makes an api call for the user to delete a place they have visited
    deleteUsersPlaceVisited: async (placeVisitedId) => {
        try {
            const response = await fetch(apiURL + 'places-visited/' + placeVisitedId, {
                method: 'DELETE',
                credentials: 'include'
            });
            const parsedResponse = await response.json();
            return parsedResponse; 
            
        } catch (error) {
            console.log('error occured while deleting place visited:', error);
        }
    }

}


