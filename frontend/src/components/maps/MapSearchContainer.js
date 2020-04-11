import React from 'react';

// components
import { Tabs, Tab } from 'react-bootstrap';
import LocationSearch from './LocationSearch.js';
import PlaceSearch from './PlaceSearch.js';


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
    					<PlaceSearch 
							mapsCurrentLocation={ this.props.mapsCurrentLocation } 
							setMapsLocation={ this.props.setMapsLocation } />
  					</Tab>
					</Tabs>
				</React.Fragment>
			) 
  }
}


export default MapSearchContainer;


