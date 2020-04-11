import React from 'react';

// components
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapHelpModal from '../help/MapHelpModal.js';
import ViewPlaceModal from '../modals/ViewPlaceModal.js';
import { Link } from 'react-router-dom';

// icons 
import UserMapMarker from '../../icons/user-map-marker.svg';
import PlaceMapMarker from '../../icons/place-map-marker.svg';


class GoogleMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mapsLatitude: this.props.mapsLocation.lat,
			mapsLongitude: this.props.mapsLocation.lng,
			showMapHelpModal: false,
			showViewPlaceModal: false,
			currentPlace: {}
		}
	}

	showMapHelpModal = () => {
		this.setState({ showMapHelpModal: true });
	}

	hideMapHelpModal = () => {
		this.setState({ showMapHelpModal: false });
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

			<MapHelpModal 
				showModal={ this.state.showMapHelpModal }
				hideModal={ this.hideMapHelpModal } />

			{/* this modal is for displaying all of the cases for a certain location	 */}
			{this.state.showViewPlaceModal ? (
					<ViewPlaceModal
						showModal={ this.state.showViewPlaceModal }
						hideModal={ this.hideShowPlaceModal } 
						place={ this.state.currentPlace } /> 
				) : (
					null
				)}	

			{/* <div className="text-center pt-1 pb-3">
				<Link 
					to="#"
					onClick={ this.showMapHelpModal }>
						Need Help?
				</Link>
			</div> */}
				
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
      						url: PlaceMapMarker,
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


