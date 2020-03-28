import React from 'react';

// redux 
import { connect } from 'react-redux';
import {  } from '../../actions/userActions.js';

import GoogleMap from './GoogleMap.js';
import CitySearchForm from './CitySearchForm.js';
import ReportCaseModal from '../modals/ReportCaseModal.js';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import ReportSymptomsButton from '../common/ReportSymptomsButton.js';
import { Link } from 'react-router-dom';


class MapContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mapIsLoading: true,
			usersLocation: {
				lat: 0,
				lng: 0
			},
			showModal: false
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

				this.setState({ 
					usersLocation: location,
					mapIsLoading: false 
				})
			});	
		}
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

				{this.state.showModal ? (
					<ReportCaseModal
						showModal={ this.state.showModal }
						hideModal={ this.hideModal } />
				) : (
					null
				)}

				<Card>
					<Card.Body>
				  <Row>
						<Col>
							<CitySearchForm />
						</Col>
						<Col>
							{this.props.isLoggedIn ? (
								<div className="d-flex d-flex flex-row-reverse">
									<ReportSymptomsButton 
										userHasCase={ this.props.usersCase } 
										showModal={ this.showModal } />
								</div>
							) : (
								<p className="text-center">
									Feeling Symptoms? <br></br>
									<Link to="/register">Sign up here</Link> to report your symptoms
								</p>
							)
							}
						</Col>
					</Row>
					</Card.Body>
				</Card>

				{/* {this.state.mapIsLoading ? (
					<div className="text-center">
						<Spinner animation="border" className="m" />
					</div>
				) : (
					<GoogleMap 
						usersLocation={ this.state.usersLocation } 
						mapIsLoading={ this.state.mapIsLoading }
					/>
				)} */}

			</React.Fragment>
    )
	}
	
}


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
		usersCase: state.cases.usersCase
	}
}

export default connect(mapStateToProps, {  })(MapContainer);


