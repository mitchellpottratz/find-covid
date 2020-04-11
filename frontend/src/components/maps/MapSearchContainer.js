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
						<Tab 
							className="py-1"
							eventKey="location-search" 
							title="Location">
    					<LocationSearch 
							  setMapsLocation={ this.props.setMapsLocation } />
  					</Tab>
						<Tab 
							className="py-1"
							eventKey="place-search"
							title="Place">
    					<p>Place search</p>
  					</Tab>
					</Tabs>
					<hr className="p-0 m-0"></hr>
				</React.Fragment>
			) 
  }
}


export default MapSearchContainer;


