import React from 'react';

// components
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


class GoogleMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			usersLatitude: this.props.usersLocation.lat,
			usersLongitude: this.props.usersLocation.lng,
			showSymptomCaseModal: false,
			showTestedPositiveCaseModal: false
		}
	}

	onMarkerClick = (props, marker, e) => {
		console.log('props:', props);
		console.log('marker:', marker);
		console.log('e:', e);
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
					title={ "Current Location" }
					position={
						{lat: this.state.usersLatitude, lng: this.state.usersLongitude}
					}
					icon={{
      			url: "user-map-marker.svg",
      			scaledSize: new this.props.google.maps.Size(20,20)
    			}}
				/>

				{/* places where people with symptoms have visited	 */}
				{this.props.placesOnMap.map((place, i) => {
					
					// if the person that visited this place has tested positive
					if (place.case.has_tested) {
						return (
							<Marker 
								key={ i }
								title={ "Has Tested Positive Case" }
								position={
									{lat: place.latitude, lng: place.longitude}
								}
								icon={{
      						url: "tested-positive-map-marker.svg",
      						scaledSize: new this.props.google.maps.Size(15, 15)
								}}
								onClick={ this.onMarkerClick }
							/>
						)

					// if the person that visited this place has only been experiencing symtoms	
					} else {
						return (
							<Marker 
								key={ i }
								title={ "Sympton Case" }
								position={
									{lat: place.latitude, lng: place.longitude}
								}
								icon={{
      						url: "symptoms-map-marker.svg",
      						scaledSize: new this.props.google.maps.Size(15, 15)
    						}}
							/>
						)
					}

				})
			}		
			</Map>
    )
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


