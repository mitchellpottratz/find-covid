import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


class GoogleMap extends React.Component {

  render() {
    return (
    	<Map
      	google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
      />
      )
  }

}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


