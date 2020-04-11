import React from 'react';

// redux 
import { connect } from 'react-redux';
import { getPlacesOnMap } from '../../actions/placesVisitedActions.js';

// components
import GoogleMap from './GoogleMap.js';
import MapSearchContainer from './MapSearchContainer.js';
import PlaceSearchForm from './PlaceSearchForm.js';
import ReportCaseModal from '../modals/ReportCaseModal.js';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import ReportSymptomsButton from '../common/ReportSymptomsButton.js';
import { Link } from 'react-router-dom';

// icons 
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class MapContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mapIsLoading: true,
			locationBlocked: false,
			mapsLocation: {
				lat: 0,
				lng: 0
			},
			mapsCityName: '',
			mapZoom: 13,
			showModal: false,
			showViewPlaceModal: false,
			currentPlace: {}
		}
	}

	componentDidMount() {
		this.setUsersLocation();
		this.props.getPlacesOnMap();
	}

	setUsersLocation = () => {

		// trys to get the users current location
		if (navigator.geolocation) {
			let location;
			navigator.geolocation.getCurrentPosition((position) => {
				location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}

				this.setState({ 
					mapsLocation: location,
					mapIsLoading: false 
				});	

			// if the user has current location disabled a default initial map position 
			// is set to Iowa City
			}, (error) => {

				const mapsInitialLocation = {
					lat: 41.6611,
					lng: -91.5302
				}

				this.setState({
					mapsLocation: mapsInitialLocation,
					mapIsLoading: false,
				  locationBlocked: true
				});
			});
		} 
	}

	setMapsLocation = (coordinates, mapZoom) => {
		this.setState({ 
			mapsLocation: coordinates,
			mapZoom: mapZoom
		});
	}

	setMapsCityName = (cityName) => {
		this.setState({ mapsCityName: cityName });
	}

	showModal = () => {
		this.setState({ showModal: true });
	}

	hideModal = () => {
		this.setState({ showModal: false });
	}


  render() {
    return (
			<React.Fragment>

				{/* if the user is logged in and has not reported a case then this modal 
					  will be available to report their case */}
				{this.state.showModal ? (
					<ReportCaseModal
						showModal={ this.state.showModal }
						hideModal={ this.hideModal } />
				) : (
					null
				)}

				<Container className="py-2">
					<MapSearchContainer 
					  setMapsLocation={ this.setMapsLocation } 
						mapsCurrentLocation={ this.state.mapsLocation }
						setMapsCityName={ this.setMapsCityName } />

					<p>{ this.state.mapsCityName }</p>
				</Container>

				{/* <Container className="mb-2">
					<Card>
						<Card.Body>
				  		<Row>
								<Col md={6} sm={12}>
									<PlaceSearchForm 
										setMapsLocation={ this.setMapsLocation } 
										mapsCurrentLocation={ this.state.mapsLocation } />
								</Col>
								<Col md={6} sm={12}>
							
									{this.props.isLoggedIn ? (
										<div class="d-flex d-flex flex-row-reverse">
											<ReportSymptomsButton 
												userHasCase={ this.props.usersCase } 
												showModal={ this.showModal } />
										</div>

									// if the user isnt logged in they are shown a link to register
									) : (
										<p className="text-center mt-4">
											Feeling Symptoms? <br></br>
											<Link to="/register">Sign up here</Link> to report your symptoms
										</p>
									)}
								</Col>
							</Row>
						</Card.Body>
					</Card>					
				</Container> */}

			
				{this.state.mapIsLoading ? (
					<div className="text-center text-primary mt-4">
						<Spinner
							animation="border"
						 	variant="primary" />
						<p className="mt-1 mb-2">Loading the Map</p>
					</div>
				) : (
						<div id="map-container">
							<GoogleMap 
								mapIsLoading={ this.state.mapIsLoading }
								mapsLocation={ this.state.mapsLocation } 
								placesOnMap={ this.props.placesOnMap }
								mapZoom={ this.state.mapZoom } />
						</div>
				)}
			</React.Fragment>
    )
	}
	
}


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
		usersCase: state.cases.usersCase,
		placesOnMap: state.placesVisited.placesOnMap
	}
}

export default connect(mapStateToProps, { getPlacesOnMap })(MapContainer);


