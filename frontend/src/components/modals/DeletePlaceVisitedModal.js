import React from 'react';

// redux
import { connect } from 'react-redux';
import { deleteUsersPlaceVisited } from '../../actions/placesVisitedActions.js';

// components
import { Modal, Button } from 'react-bootstrap';

 

class DeletePlaceVisitedModal extends React.Component {

	handleDelete = async (e) => {
		e.preventDefault();

		const response = await this.props.deleteUsersPlaceVisited(this.props.placeVisited.id);

		if (response.status.code === 204) {
			this.props.hideModal();
		}
	}
	
	render() {
		const placeVisited = this.props.placeVisited;
		const placeVisitedDate = new Date(placeVisited.date_visited);

		// so the modal is not returned if the user is not trying to delete a place
		// they have visited
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
						<strong>Address: </strong> { placeVisited.address || '' }
					</p>
					<p>
						<strong>Date Visited: </strong> { placeVisitedDate.toDateString() || '' }
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={ this.handleDelete } >
							Delete
					</Button>
					<Button 
						variant="light"
						onClick={ this.props.hideModal }>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

}


export default connect(null, { deleteUsersPlaceVisited })(DeletePlaceVisitedModal);


