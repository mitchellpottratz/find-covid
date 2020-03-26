import React from 'react';

// redux 
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions.js'


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            phone_number: '',
            password: ''
        }
    }

    render() {
        return (
            <p>Login Component</p>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, {  })(Login); 