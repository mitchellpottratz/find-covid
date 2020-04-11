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
    console.log('value:', value);
  }

  render() {
    return (
      <React.Fragment>
        <LiveSearchInput />
      </React.Fragment>
    )
  }
}


export default LocationSearch;