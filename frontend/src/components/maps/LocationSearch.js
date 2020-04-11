import React from 'react';

// components
import { Form } from 'react-bootstrap';
import LiveSearchInput from '../common/LiveSearchInput.js';


class LocationSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      location: '',
      searchPredictions: ['Test'],
      selected: {}
    }
  }

  handleChange = (value) => {
    this.setState({ location: value });
  }

  handleSearchPredictionClick = (prediction) => {
    console.log('prediction:', prediction);

    this.setState({
      location: prediction.description,
      selected: prediction
    }); 
  }

  getSearchPredictionResults = async () => {
    const url = process.env.REACT_APP_API_URL + 'maps/autocomplete/city?search_input=' + this.state.location;

    const response = await fetch(url);
    const parsedResponse = await response.json();
    
    const searchPredictions = parsedResponse.data.predictions;
    this.setState({ 
      searchPredictions: searchPredictions 
    });
  }

  render() {
    return (
      <React.Fragment>
        <LiveSearchInput
          label="Set your location on the map"
          placeholder="Start typing..."
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