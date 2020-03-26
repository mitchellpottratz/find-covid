import apiURL from './config.js';


export default {

    // makes api call to register a new user
    registerUser: async (registrationInfo) => {
        try {
            const response = await fetch(apiURL + 'users/register', {
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
    }
}