import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import { Modal, Form, Button } from 'react-bootstrap';

 

class DeletePlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Modal 
				show={ this.props.showModal } 
				onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Delete Place Visited</Modal.Title>
				</Modal.Header>	
				<Modal.Body>
					<p>
						Are you sure you would like to delete this place you visited?
					</p>
				</Modal.Body>
			</Modal>
		)
	}

}


export default connect(null, {})(DeletePlaceVisitedModal);


