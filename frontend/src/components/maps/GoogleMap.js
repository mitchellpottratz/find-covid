import React from 'react';

// components
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import SymptomMarker from './SymptomMarker.js';


class GoogleMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			usersLatitude: this.props.usersLocation.lat,
			usersLongitude: this.props.usersLocation.lng 
		}

		console.log('places on map:', this.props.placesOnMap);
	}

  render() {
		const mapStyles = {
			width: '100%',
			height: '80%',
		}

    return (
			
    	<Map
      	google={ this.props.google }
				zoom={ 13 }
				style={ mapStyles }
				initialCenter={{ lat: this.state.usersLatitude, lng: this.state.usersLongitude }}
				>
				<Marker 
					name={ "Your Location" }
					position={
						{lat: this.state.usersLatitude, lng: this.state.usersLongitude}
					}
					icon={{
      			url: "user-map-marker.svg",
      			scaledSize: new this.props.google.maps.Size(20,20)
    			}}
				/>
			</Map>
    )
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


