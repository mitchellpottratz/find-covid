import React from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBListGroup, MDBListGroupItem } from "mdbreact"
import FormButton from '../common/FormButton.js';


class CitySearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			city: '',
			searchPredictions: [],
			isSearching: false,
			isLoading: false
		}
	}

	handleChange = (e) => {
		this.setState({ city: e.target.value });

		if (this.state.city.length < 3) {
			this.setState({ isSearching: false })
		} else {
			this.setState({ isSearching: true })
		}

		this.getAutocompleteResults();
	}

	getAutocompleteResults = async () => {
		const response = await fetch('http://localhost:8000/api/v1/maps/autocomplete/city?search_input=' + this.state.city);
		const parsedResponse = await response.json();
		const googleApiResponse = parsedResponse.data;

		if (googleApiResponse.status === 'OK') {
			this.setState({ searchPredictions: googleApiResponse.predictions });
		}
	}

	// when a city from the search results drop down is clicked
	handleSearchPredictionClick = async (city) => {
		console.log('city:', city);

		this.setState({
			city: city.description,
			isSearching: false
		})

		// makes request to get the latitude and longitude of the city
		const googlePlaceId = city.place_id;
		const response = await fetch(
			'http://localhost:8000/api/v1/maps/places/location?google_place_id=' + googlePlaceId
		);
		const parsedResponse = await response.json()
		console.log('response:', parsedResponse)
	}
	
	render() {
		return (
			<Form>
				<Row>
					<Col md={ 8 } sm={ 9 }>
							<MDBInput
								className="mb-0 pb-0"
								type="text"
								hint="Search for a City"
								name="city"
								value={ this.state.city }
								onChange={ this.handleChange } />

							{/* show the dropdown box to get city autocomplete predictions if the user 
									is current searching */}
							{this.state.isSearching ? (
								<MDBListGroup className="dropdown-search-box">
              	{this.state.searchPredictions.map((city, i) => {
									return (
										<MDBListGroupItem 
											key={i} 
											className="dropdown-search-item"
											onClick={ () => this.handleSearchPredictionClick(city) }>
											{ city.description }
										</MDBListGroupItem>
									)
								})}
            	</MDBListGroup>
							) : (
								null
							)}
	
					</Col>
					<Col md={ 4 } sm={ 3 }>
						<FormButton 
							variant="dark"
							text="Search"
							isLoading={ this.state.isLoading } />
					</Col>
				</Row>
					
			</Form>
		)
	}
}


export default CitySearchForm;


