import React from 'react';

// components
import { Tabs, Tab } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


class MapSearchContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
				<React.Fragment>
					<Tabs 
						className="d-flex justify-content-center"
						defaultActiveKey="location-search"
						transition={false}>
  					<Tab eventKey="location-search" title="Location">
    					<p>Location search</p>
  					</Tab>
  					<Tab eventKey="place-search" title="Place">
    					<p>Place search</p>
  					</Tab>
					</Tabs>
				</React.Fragment>
			) 
  }
}


export default MapSearchContainer;


