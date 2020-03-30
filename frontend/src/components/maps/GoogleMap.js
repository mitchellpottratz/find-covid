import React from 'react';

// components
import { Map, GoogleApiWrapper } from 'google-maps-react';


class GoogleMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			usersLatitude: this.props.usersLocation.lat,
			usersLongitude: this.props.usersLocation.lng 
		}
	}

  render() {
		const mapStyles = {
			width: '100%',
			height: '80%',
		}

    return (
    	<Map
      	google={this.props.google}
				zoom={ 8 }
				style={ mapStyles }
        initialCenter={{ lat: this.state.usersLatitude, lng: this.state.usersLongitude }}
      />
    )
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


