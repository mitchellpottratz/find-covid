import React from 'react';

// redux 
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions.js';

import GoogleMap from './GoogleMap.js';


class MapContainer extends React.Component {

  render() {
    return (
      <p>map container</p>
    )
	}
	
}


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo
	}
}


export default connect(mapStateToProps, {  })(MapContainer);

