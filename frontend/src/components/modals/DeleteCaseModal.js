import React from 'react';

// redux
import { connect } from 'react-redux';
import { deleteUsersCase } from '../../actions/casesActions.js';

// components
import { Modal, Button } from 'react-bootstrap';
 

class DeleteCaseModal extends React.Component {

	handleDelete = async (e) => {
		e.preventDefault();

		const response = await this.props.deleteUsersCase(this.props.userId);
		
		if (response.status.code === 204) {
			this.props.hideModal();
		}
	}
	
	render() {
		const usersCase = this.props.usersCase;
		const symptomsDate = new Date(usersCase.symptoms_date);

		return (
			<Modal 
				show={ this.props.showModal } 
				onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Delete Your Reported Case</Modal.Title>
				</Modal.Header>	
				<Modal.Body>
					<p>
						Are you sure you would like to delete your case?
					</p>
					<p>
						<strong>Tested Positive: </strong> 
						{usersCase.has_tested ? (
							<span>Yes</span>
						) : (
							<span>No</span>
						)}
					</p>
					<p>
						<strong>Symptoms Date: </strong> { symptomsDate.toDateString() } 
					</p>
					<p>
						<strong>Age: </strong> { usersCase.age } 
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


export default connect(null, { deleteUsersCase })(DeleteCaseModal);