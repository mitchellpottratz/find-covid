import React from 'react';

import { Modal } from 'react-bootstrap';


function MapHelpModal(props) {
  return (
		<Modal
			show={ props.showModal } 
			onHide={ props.hideModal }>
		  <Modal.Header closeButton>
				<Modal.Title>How to use the Map</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					The purpose of our map is to provide our users with a tool which provides them 
					the ability to take extra precautions while leaving their home during the 
					COVID-19 pandemic.
				</p>
				<p>
					First off, our map requires that you share your current location with Google. Our map uses
					your location to get cases of COVID-19 in your area and to search for places is your area.
					<strong> We do not share any information regarding your current location.</strong>
				</p>
				<p>
					The <strong>black marker</strong> on the map is your current location. 
				</p>
				<p>
					The <strong class="text-danger">red marker</strong> on the map marks a place where people have 
					reported visiting while being tested positive or have just shown symptoms. You may click on 
					these markers to view more in-depth information regarding these cases.
				</p>
			</Modal.Body>
		</Modal>
  )
}


export default MapHelpModal;
