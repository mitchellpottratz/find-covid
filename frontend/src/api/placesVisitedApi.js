import apiURL from './config.js';


export default {

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
    }

}