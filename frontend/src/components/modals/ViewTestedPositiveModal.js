import React from 'react';

import { Modal } from 'react-bootstrap';


class ViewTestedPositiveModal extends React.Component {

  constructor(props) {
		super(props);
	}
	
	// fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
		// .then((response) => response.json())
		// .then((responseJson) => {
		// 		console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
// })

	render() {
		return (
			<Modal 
				show={ this.props.showModal }
				onHide={ this.props.hideModal } >
					<Modal.Header>
						<Modal.Title>Tested Positive</Modal.Title>
					</Modal.Header>
			</Modal>
		)
	}
}


export default ViewTestedPositiveModal;

