import React from 'react';

// components
import { Tabs, Tab } from 'react-bootstrap';
import LocationSearch from './LocationSearch.js';


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
    					<LocationSearch />
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


