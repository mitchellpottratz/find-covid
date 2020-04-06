import React from 'react';

import { Modal } from 'react-bootstrap';


function MapHelpModal(props) {
  return (
		<Modal
			show={ this.props.showModal } 
			onHide={ this.props.hideModal }>
		  <Modal.Header>
				<Modal.Title>How to use the Map</Modal.Title>
			</Modal.Header>
			<Modal.Body>

			</Modal.Body>
		</Modal>
  )
}


export default MapHelpModal;
