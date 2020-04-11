import React from 'react';

import LiveSearchInput from '../common/LiveSearchInput.js';


class PlaceSearch extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      place: '',
      searchPredictions: [],
      selected: {}
    }
  }

  handleChange = (value) => {
    this.setState({ place: value });
  }

  getSearchPredictionResults = async () => {
    try {
      const latitude = this.props.mapsCurrentLocation.lat;
      const longitude = this.props.mapsCurrentLocation.lng;

			const response = await fetch(
				process.env.REACT_APP_API_URL + 'maps/autocomplete/places?search_input=' + this.state.place +
				                                '&latitude=' + latitude + '&longitude=' + longitude
			);
			const parsedResponse = await response.json();
			const googleApiResponse = parsedResponse.data;
      console.log('prediction:', googleApiResponse);

			if (googleApiResponse.status === 'OK') {
				this.setState({ searchPredictions: googleApiResponse.predictions });
			} 

		}	catch (error) {}
	}
  

  handleSearchPredictionClick = async (prediction) => {
    console.log('place:', prediction);
    this.setState({ 
      place: prediction.description,
      selected: prediction
    });
    
	
		// makes request to get the latitude and longitude of the place
    const googlePlaceId = prediction.place_id;
    const location = await this.getPlacesInfo(googlePlaceId);
    console.log('location:', location);

    if (location) {
      // changes the position of the map to whatever place was searched
		  this.props.setMapsLocation(location);
    }
  }

  getPlacesInfo = async (googlePlaceId) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + 'maps/places/location?google_place_id=' + googlePlaceId
      );
      const parsedResponse = await response.json();

      const location = parsedResponse.data.result.geometry.location;
      return location;

    } catch (error) {
      return;
    } 
  }

  render() {
    return (
      <React.Fragment>
        <LiveSearchInput 
          label="Search for place near your location"
          placeholder="Start searching for a place..."
          searchPredictions={ this.state.searchPredictions }
          inputValue={ this.state.place }
          selected={ this.state.selected }
          handleChange={ this.handleChange }
          handleSearchPredictionClick={ this.handleSearchPredictionClick } 
          getSearchPredictionResults={ this.getSearchPredictionResults } />
      </React.Fragment>
    )
  }
}

export default PlaceSearch;

