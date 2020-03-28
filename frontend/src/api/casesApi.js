import apiURL from './config.js';


export default {

    // makes a request to create a users case
    createUserCase: async (caseInfo) => {
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
    }

} 