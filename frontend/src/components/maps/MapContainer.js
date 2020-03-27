import React from 'react';

// redux 
import { connect } from 'react-redux';
import {  } from '../../actions/userActions.js';

import GoogleMap from './GoogleMap.js';
import { Spinner } from 'react-bootstrap';


class MapContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mapIsLoading: true,
			usersLocation: {
				lat: 0,
				lng: 0
			}
		}
	}

	componentDidMount() {
		this.setUsersLocation();
	}

	// uses the google maps api to get the users current location
	setUsersLocation = () => {
		if (navigator.geolocation) {
			let location;
			navigator.geolocation.getCurrentPosition((position) => {
				location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
				console.log('location:', location);

				this.setState({ 
					usersLocation: location,
					mapIsLoading: false 
				})
			});	
		}
	}

  render() {
		console.log('map loading:', this.state.mapIsLoading);

    return (
			<React.Fragment>

				{this.state.mapIsLoading ? (
					<div className="text-center">
						<Spinner animation="border" className="m" />
					</div>
				) : (
					<GoogleMap 
						usersLocation={ this.state.usersLocation } 
						mapIsLoading={ this.state.mapIsLoading }
					/>
				)}

			</React.Fragment>
    )
	}
	
}


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
	}
}

export default connect(mapStateToProps, {  })(MapContainer);


