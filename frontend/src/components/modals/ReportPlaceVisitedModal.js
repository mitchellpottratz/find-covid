import React from 'react';

// redux 
import { connect } from 'react-redux';
import { createUsersPlaceVisited } from '../../actions/placesVisitedActions.js';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import FormButton from '../common/FormButton.js';
import {  MDBListGroup, MDBListGroupItem } from "mdbreact"


class ReportPlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			place: '',
			googlePlaceId: '',
			date_visited: new Date(),
			isSearchingForPlace: false,
			searchPlacePredictions: [],
			isLoading: false,
			formErrorMessages: []
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleDateChange = (date) => {
		this.setState({ date_visited: date });
	}

	// handle change for the location autocomplete input
	handlePlaceChange = (e) => {
		this.setState({ place: e.target.value });

		if (this.state.place.length < 2) {
			this.setState({ isSearchingForPlace: false })
		} else {
			this.setState({ isSearchingForPlace: true })
		}

		this.getAutocompleteResults();
	}

	getAutocompleteResults = async () => {
		try {
			const response = await fetch(
				process.env.REACT_APP_API_URL + 'maps/autocomplete/places?search_input=' + this.state.place + 
				'&latitude=' + this.props.usersCase.latitude + 
				'&longitude=' + this.props.usersCase.longitude
			);
			const parsedResponse = await response.json();
			const googleApiResponse = parsedResponse.data;

			if (googleApiResponse.status === 'OK') {
				this.setState({ searchPlacePredictions: googleApiResponse.predictions });
			} 

		}	catch (error) {
			// TODO - handle this error
			console.log('error occurred while searching for places:', error);
		}
	}

	handleSearchPredictionClick = (place) => {
		const placeDescription = place.description;
		const googlePlaceId = place.place_id;

		this.setState({ 
			isSearchingForPlace: false,
			place: placeDescription,
			googlePlaceId: googlePlaceId
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		await this.setState({
			formErrorMessages: [],
			isLoading: true
		});

		// if the user selected a place correctly
		let placesLocation;
		if (this.state.googlePlaceId !== '') {
			placesLocation = await this.getPlacesLocation();
			await this.reportPlaceVisited(placesLocation);

		// otherwise an error message is show on the form
		} else {
			const newErrorMessage = 'The place you selected is not valid';
			this.setState({
				formErrorMessages: [...this.state.formErrorMessages, newErrorMessage],
				isLoading: false
			});
			return;
		}
	}

	// get the latitude and longitude of the place the user visited
	getPlacesLocation = async () => {
		try {
			const response = await fetch(
				process.env.REACT_APP_API_URL + 'maps/places/location?google_place_id=' + this.state.googlePlaceId
			);
			const parsedResponse = await response.json();
			return parsedResponse.data.result.geometry.location;

		} catch (error) {
			console.log('error:', error);
		}
	}

	// formats the request body and calls the action to make a request to 
	// report the place the user visited
	reportPlaceVisited = async (placesLocation) => {

		// address is formatted as a object by the google api so the request 
		// body needs to be reformatted 
		const placesName = this.state.place.split(',')[0];
		const requestBody = {
			name: placesName,
			address: this.state.place,
			latitude: placesLocation.lat,
			longitude: placesLocation.lng,
			date_visited: this.state.date_visited,
			google_place_id: this.state.googlePlaceId
		}

		// makes api call to report the place the user visited
		const response = await this.props.createUsersPlaceVisited(requestBody);

		this.setState({ isLoading: false });

		// if the place visited was created then the modal is hidden
		if (response.status.code === 201) {
			this.clearState();
			this.props.hideModal();
		}
	}


	clearState = () => {
		this.setState({
			name: '',
			place: '',
			googlePlaceId: '',
			date_visited: new Date(),
		});
	}

	hideSearchPredictionsBox = () => {
		// explanation for using timeout in hideSearchPredictionsBox method in PlaceSearchForm.js 
		setTimeout(() => {
			this.setState({ isSearchingForPlace: false });
		}, 200);
	}

  render() {
		return (
			<Modal 
				show={ this.props.showModal } 
				onHide={ this.props.hideModal }>
		  	<Modal.Header closeButton>
					<Modal.Title>Report Place Visited</Modal.Title>
				</Modal.Header>		
				<Modal.Body>

					{/* form error messages */}
					{this.state.formErrorMessages.map((message, i) => {
          	return (
            	<div key={ i }>
								<small className="text-danger">{ message }</small>
							</div>
            )
          })}	
					
				<Form
					className="py-3 text-center"
					onSubmit={ this.handleSubmit } >

					<Form.Group>
						<Form.Label>Start typing the name of the place</Form.Label>
						<Form.Control 
							type="text"
							name="place"
							placeholder="Start typing..." 
							value={ this.state.place }
							onChange={ this.handlePlaceChange }
							onBlur={ this.hideSearchPredictionsBox } 
							/>

							{/* if the user is currently searching for the place they visited then the search 
							    predictions box will appear for them to select a place */}
							{this.state.isSearchingForPlace ? (
								<MDBListGroup className="dropdown-search-box">
									<MDBListGroupItem>
										<strong>Select a place below</strong>
									</MDBListGroupItem>
              		{this.state.searchPlacePredictions.map((place, i) => {
										
										return (
											<MDBListGroupItem
												key={ i } 
												className="dropdown-search-item"
												description={ place.description }
												place_id={ place.place_id }
												value="value"
												onClick={ () => this.handleSearchPredictionClick(place) }>
												{ place.description }
											</MDBListGroupItem>
										)
								})}
            	</MDBListGroup>
							) : (
								null
							)}
					</Form.Group>
					
					<Form.Group>
						<Form.Label>When did you visit this place?</Form.Label>
						<DatePicker
							className="w-100"
							value={ this.state.date_visited }
							onChange={ this.handleDateChange } />
					</Form.Group>

					<FormButton 
						variant="primary"
						text="Report"
						isLoading={ this.state.isLoading } />
				</Form>

				</Modal.Body>
    	</Modal>
		)
	}
}


export default connect(null, { createUsersPlaceVisited })(ReportPlaceVisitedModal);

