import React from 'react';
import { Redirect } from 'react-router-dom';


/* 
This component takes in two props, isLoggedIn and phoneNumberConfirmed, and redirects 
the user if they are not logged in or if they have not confirmed their phone number yet
*/


function AuthCheck(props) {

    // if the user is not logged in
    if (!props.isLoggedIn) {
        return (
            <Redirect to="/login" />
        )

    // if the user is logged in by has not confirmed their phone number
    } else if (props.isLoggedIn && !props.phoneNumberConfirmed) {
        return (
            <Redirect to="/confirm-number" />    
        )
    }    
} 


export default AuthCheck;
