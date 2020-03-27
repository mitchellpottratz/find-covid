import React from 'react';

// components
import { Map, GoogleApiWrapper } from 'google-maps-react';



class GoogleMap extends React.Component {

	componentDidMount() {
		this.getUsersLocation();
	}

	getUsersLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
				console.log('position:', position);
			});	
		}
	}
	

  render() {
		const mapStyles = {
			width: '100%',
			height: '80%',
		};

    return (
    	<Map
      	google={this.props.google}
				zoom={ 8 }
				style={ mapStyles }
        initialCenter={{ lat: 47.444, lng: -122.176}}
      />
    )
  }

}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);


