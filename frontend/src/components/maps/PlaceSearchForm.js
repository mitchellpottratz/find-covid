import React from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBListGroup, MDBListGroupItem } from "mdbreact"


class PlaceSearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			place: '',
			searchPredictions: [],
			isSearching: false,
			isLoading: false
		}
	}

	handleChange = (e) => {
		this.setState({ place: e.target.value });

		if (this.state.place.length < 3) {
			this.setState({ isSearching: false })
		} else {
			this.setState({ isSearching: true })
		}

		this.getAutocompleteResults();
	}


	// get the place autocomplete search results from the google places api
	getAutocompleteResults = async () => {
		try {
			const response = await fetch(
				'http://localhost:8000/api/v1/maps/autocomplete/places?search_input=' + this.state.place
			);
			const parsedResponse = await response.json();
			const googleApiResponse = parsedResponse.data;

			if (googleApiResponse.status === 'OK') {
				this.setState({ searchPredictions: googleApiResponse.predictions });
			} 

		}	catch (error) {
			// TODO - handle this error
			console.log('error occurred while searching for places:', error);
		}
	}

	// when a place from the search results drop down is clicked
	handleSearchPredictionClick = async (city) => {
		this.setState({
			place: city.description,
			isSearching: false
		})

		// makes request to get the latitude and longitude of the place
		const googlePlaceId = city.place_id;
		const response = await fetch(
			'http://localhost:8000/api/v1/maps/places/location?google_place_id=' + googlePlaceId
		);
		const parsedResponse = await response.json()

		// changes the position of the map to whatever city was searched
		this.props.setMapsLocation(parsedResponse.data.result.geometry.location)
	}
	
	render() {
		return (
			<Form>
				<Row>
					<Col md={ 8 } sm={ 12 }>
							<Form.Control
								className="mb-0 pb-0"
								type="text"
								placeholder="Start typing..."
								name="place"
								value={ this.state.place }
								onChange={ this.handleChange }
								onBlur={ () => this.setState({ isSearchingForPlace: false }) } />

							{/* show the dropdown box to get places autocomplete predictions if the user 
									is current searching */}
							{this.state.isSearching ? (
								<MDBListGroup className="dropdown-search-box">
              	{this.state.searchPredictions.map((place, i) => {
									return (
										<MDBListGroupItem 
											key={i} 
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
	
					</Col>
					<Col></Col>
				</Row>
					
			</Form>
		)
	}
}


export default PlaceSearchForm;


