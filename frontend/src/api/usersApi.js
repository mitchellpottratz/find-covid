import apiURL from './config.js';


export default {

    // makes a request to register a new user
    registerUser: async (registrationInfo) => {
        try {
            const response = await fetch(apiURL + 'users/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(registrationInfo),
            });
            const parsedResponse = await response.json();
            return parsedResponse;        

        } catch (error) {
            // TODO - handle this error
            console.log('error occurred during registration:', error);
        }
    },

    // makes a request to logout a user
    logoutUser: async () => {
        try {
            const response = await fetch(apiURL + 'users/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const parsedResponse = await response.json();
            return parsedResponse;

        } catch (error) {
            // TODO - handle this error
            console.log('error occurred while logging out:', error);
        }
    }
}