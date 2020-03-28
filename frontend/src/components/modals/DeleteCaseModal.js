import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import { Modal, Button } from 'react-bootstrap';
 

class DeleteCaseModal extends React.Component {

	constructor(props) {
		super(props);
	}

	handleDelete = async (e) => {
		e.preventDefault();

		this.props.hideModal();
	}
	
	render() {
		const usersCase = this.props.usersCase;

		return (
			<Modal 
				show={ this.props.showModal } 
				onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Delete Your Case</Modal.Title>
				</Modal.Header>	
				<Modal.Body>
					<p>
						Are you sure you would like to delete your case?
					</p>
					<p>
						<strong>Name: </strong> 
					</p>
					<p>
						<strong>Address: </strong> 
					</p>
					<p>
						<strong></strong> 
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


export default connect(null, {  })(DeleteCaseModal);