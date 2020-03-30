import React from 'react';

// redux
import { connect } from 'react-redux';
import { deleteUsersCase } from '../../actions/casesActions.js';

// components
import { Modal, Button } from 'react-bootstrap';
 

class DeleteCaseModal extends React.Component {

	constructor(props) {
		super(props);
	}

	handleDelete = async (e) => {
		e.preventDefault();
		console.log('userId:', this.props.userId);
		
		const response = await this.props.deleteUsersCase(this.props.userId);
		
		this.props.hideModal();
	}
	
	render() {
		const usersCase = this.props.usersCase;

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
					</p>
					<p>
						<strong>Symptoms Date: </strong> { usersCase.symptoms_date } 
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