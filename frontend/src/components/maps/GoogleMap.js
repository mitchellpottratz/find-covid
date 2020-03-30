import React from 'react';

// components
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


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
      	google={ this.props.google }
				zoom={ 13 }
				style={ mapStyles }
				initialCenter={{ lat: this.state.usersLatitude, lng: this.state.usersLongitude }}
				>

				{/* users location marker */}
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

				{this.props.placesOnMap.map((place) => {
					return (
						<Marker 
							name={ "Sympton Case" }
							position={
								{lat: place.latitude, lng: place.longitude}
							}
							icon={{
      					url: "symptoms-map-marker.svg",
      					scaledSize: new this.props.google.maps.Size(15, 15)
    					}}
						/>
					)
				})



				}

				
			</Map>
    )
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


