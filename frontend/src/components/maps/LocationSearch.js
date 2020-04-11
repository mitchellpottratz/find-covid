import React from 'react';

import LiveSearchInput from '../common/LiveSearchInput.js';


class LocationSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      location: '',
      searchPredictions: [],
      selected: {}
    }
  }

  handleChange = (value) => {
    this.setState({ location: value });
  }

  handleSearchPredictionClick = async (prediction) => {
    const cityName = prediction.description;

    this.setState({
      location: cityName,
      selected: prediction
    }); 

    // gets the latitude and longitude of the city
    const location = await this.getCityInfo(prediction.place_id);

    if (location) {
      // updates the location on the map and the city name currently displayed
      this.props.setMapsLocation(location, 12);
      this.props.setMapsCityName(cityName);
    }
  }

  getSearchPredictionResults = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'maps/autocomplete/city?search_input=' +
                  this.state.location;

      const response = await fetch(url);
      const parsedResponse = await response.json();
    
      const searchPredictions = parsedResponse.data.predictions;

      this.setState({ 
        searchPredictions: searchPredictions 
      });

    } catch (error) {}
  }

  getCityInfo = async (googlePlaceId) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'maps/places/location?google_place_id=' +
                  googlePlaceId;

      const response = await fetch(url);
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
          label="Set your location on the map"
          placeholder="Start searching for a city..."
          searchPredictions={ this.state.searchPredictions }
          inputValue={ this.state.location }
          selected={ this.state.selected }
          handleChange={ this.handleChange }
          handleSearchPredictionClick={ this.handleSearchPredictionClick } 
          getSearchPredictionResults={ this.getSearchPredictionResults } />
      </React.Fragment>
    )
  }
}


export default LocationSearch;