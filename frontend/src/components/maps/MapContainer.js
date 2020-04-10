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

	// uses the google maps api to get the users current location 
	setUsersLocation = () => {
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

			// if the user blocked google accessing their current location
			}, (error) => {
				this.setState({
					mapIsLoading: false,
					locationBlocked: true
				});
			});
		} 
	}

	setMapsLocation = (coordinates) => {
		this.setState({ 
			mapsLocation: coordinates,
			mapZoom: 18 
		});
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

				<Container className="pt-3">
					<MapSearchContainer />
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


				{this.state.mapIsLoading === false & this.state.locationBlocked ? (
					<div className="text-center mt-4">
						<p className="text-danger">
							<FontAwesomeIcon icon={ faExclamationCircle } className="mr-2" />
							You blocked Google from acessing your current location
						</p>
						<small>
							In order to use our map, you must allow Google to access your current location 
							in your browser settings.
						</small>	
					</div>
				) : 
					this.state.mapIsLoading ? (
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


