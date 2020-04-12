import apiURL from './config.js';


export default {

    // makes an api call to get a users case
    getUsersCase: async (userId) => {
        try {
            const response = await fetch(apiURL + 'cases/' + userId, {
                method: 'GET',
                credentials: 'include',
            });
            const parsedResponse = await response.json();
            return parsedResponse;        

        } catch (error) {
            // TODO - handle this error
            console.log('error occurred while getting the user case:', error);
        } 
    },  

    // makes a request to create a users case
    createUsersCase: async (caseInfo) => {
        try {
            const response = await fetch(apiURL + 'cases/', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(caseInfo),
            });
            const parsedResponse = await response.json();
            return parsedResponse;        

        } catch (error) {
            // TODO - handle this error
            console.log('error occurred while creating the users case:', error);
        }
    },

    // makes and api call to delete a users case
    deleteUsersCase: async (userId) => {
        try {
            const response = await fetch(apiURL + 'cases/' + userId, {
                method: 'DELETE',
                credentials: 'include',
            });
            const parsedResponse = await response.json();
            return parsedResponse;        

        } catch (error) {
            // TODO - handle this error
            console.log('error occurred while creating the users case:', error);
        }        
    }

} 