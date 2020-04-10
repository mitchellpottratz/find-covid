import React from 'react';

import { Typeahead } from 'react-bootstrap-typeahead';


class LocationSearch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Typeahead />
      </React.Fragment>
    )
  }
}


export default LocationSearch;