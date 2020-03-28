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
		console.log('placeVisited:', this.props.placeVisited);
		const placeVisited = this.props.placeVisited;

		if (!placeVisited.name) {
			return (
				null
			)
		}

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
					<p>
						<strong>Name: </strong> { placeVisited.name || '' }
					</p>
					<p>
						<strong>Address: </strong> { placeVisited.address.place || '' }
					</p>
					<p>
						<strong>Date Visited: </strong> { placeVisited.date_visited || '' }
					</p>
				</Modal.Body>
			</Modal>
		)
	}

}


export default connect(null, {})(DeletePlaceVisitedModal);


