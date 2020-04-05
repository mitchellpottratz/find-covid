import React from 'react';

// components
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import ViewPlaceModal from '../modals/ViewPlaceModal.js';


class GoogleMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mapsLatitude: this.props.mapsLocation.lat,
			mapsLongitude: this.props.mapsLocation.lng,
			showViewPlaceModal: false,
			currentPlace: {}
		}
	}

	showViewPlaceModal = (place) => {
		this.setState({ 
			showViewPlaceModal: true,
			currentPlace: place
		});
	}

	hideShowPlaceModal = () => {
		this.setState({ 
			showViewPlaceModal: false, 
			currentPlace: {} 
		});
	}

  render() {
		const mapStyles = {
			width: '100%',
			height: '80%',
		}

    return (
			<React.Fragment>

			{/* this modal is for displaying all of the cases for a certain location	 */}
			{this.state.showViewPlaceModal ? (
					<ViewPlaceModal
						showModal={ this.state.showViewPlaceModal }
						hideModal={ this.hideShowPlaceModal } 
						place={ this.state.currentPlace } /> 
				) : (
					null
				)}	

    	<Map
      	google={ this.props.google }
				zoom={ this.props.mapZoom }
				style={ mapStyles }
				initialCenter={
					{ lat: this.props.mapsLocation.lat, lng: this.props.mapsLocation.lng }
				}
				center={ 
					{ lat: this.props.mapsLocation.lat, lng: this.props.mapsLocation.lng }
				}
				>

				{/* users location marker */}
				<Marker 
					title={ "Current Location" }
					position={
						{lat: this.state.mapsLatitude, lng: this.state.mapsLongitude}
					}
					icon={{
      			url: "/icons/user-map-marker.svg",
      			scaledSize: new this.props.google.maps.Size(20,20)
    			}}
				/>

				{/* places where people with symptoms have visited */}
				{this.props.placesOnMap.map((place, i) => {
					return (
						<Marker 
								key={ i }
								title={ "Has Tested Positive Case" }
								position={
									{lat: place.latitude, lng: place.longitude}
								}
								icon={{
      						url: "/icons/tested-positive-map-marker.svg",
      						scaledSize: new this.props.google.maps.Size(15, 15)
								}}
								onClick={ () => this.showViewPlaceModal(place) }
							/>
					)
						})}
			</Map>

			</React.Fragment>
    )
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


