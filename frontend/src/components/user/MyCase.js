import React from 'react';

// redux 
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions.js';

// components
import AuthCheck from '../common/AuthCheck.js';
import { Container } from 'react-bootstrap';




class MyCase extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
			<Container>
      	<AuthCheck 
        	isLoggedIn={ this.props.isLoggedIn } 
      		phoneNumberConfirmed={ this.props.userInfo.phone_number_confirmed } />
        <p>my case</p>
			</Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        usersCase: state.cases.usersCase
    }
}

export default connect(mapStateToProps, {})(MyCase);