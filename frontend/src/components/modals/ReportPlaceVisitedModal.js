import React from 'react';

// redux 
import { connect } from 'react-redux';
import { createUsersPlaceVisited } from '../../actions/placesVisitedActions.js';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { GoogleComponent } from 'react-google-location'
import FormButton from '../common/FormButton.js';
import { MDBInput, MDBListGroup, MDBListGroupItem } from "mdbreact"


class ReportPlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			place: '',
			placeId: '',
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
		this.setState({
			date_visited: date
		});
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
				'http://localhost:8000/api/v1/maps/autocomplete/places?search_input=' + this.state.place
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
		const placeId = place.place_id;

		this.setState({ 
			isSearchingForPlace: false,
			place: placeDescription,
			placeId: placeId
		});
	}

	

	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({
			formErrorMessages: [],
			isLoading: true
		});

		// address is formatted as a object by the google api so the request 
		// body needs to be reformatted
		const requestBody = {
			name: this.state.name,
			address: this.state.location.place,
			latitude: this.state.location.coordinates.lat,
			longitude: this.state.location.coordinates.lng,
			date_visited: this.state.date_visited
		}

		const response = await this.props.createUsersPlaceVisited(requestBody);
		console.log('response:', response);

		this.setState({ isLoading: false });

		// if the place visited was created then the modal is hidden
		if (response.status.code === 201) {
			this.props.hideModal();
		}
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
					
				<Form
					className="py-3 text-center"
					onSubmit={ this.handleSubmit } >

					<Form.Group>
						<Form.Label>What is the name of this place?</Form.Label>
						<Form.Control 
							required
							type="text"
							name="name"
							placeholder="Name"
							value={ this.state.name }
							onChange={ this.handleChange } />
					</Form.Group>

					<Form.Group>
						<Form.Label>What is the address of this place?</Form.Label>
						<Form.Control 
							type="text"
							name="place"
							placeholder="Start typing..." 
							value={ this.state.place }
							onChange={ this.handlePlaceChange } />

							{/* if the user is currently searching for the place they visited then the search 
							    predictions box will appear for them to select a place */}
							{this.state.isSearchingForPlace ? (
								<MDBListGroup className="dropdown-search-box">
              	{this.state.searchPlacePredictions.map((place, i) => {
									return (
										<MDBListGroupItem 
											key={ i } 
											className="dropdown-search-item"
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
						variant="dark"
						text="Report"
						isLoading={ this.state.isLoading } />
				</Form>

				</Modal.Body>
    	</Modal>
		)
	}
}


export default connect(null, { createUsersPlaceVisited })(ReportPlaceVisitedModal);

