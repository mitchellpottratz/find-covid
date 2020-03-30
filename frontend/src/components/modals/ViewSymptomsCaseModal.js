import React from 'react';

import { Modal, Button } from 'react-bootstrap';


class ViewSymptomsCaseModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
		const { caseInfo } = this.props;
		console.log('case info:', caseInfo);

		const dateVisited = new Date(caseInfo.date_visited);
		const symptomsDate = new Date(caseInfo.case.symptoms_date);

  	return (
			<Modal 
				show={ this.props.showModal }
				onHide={ this.props.hideModal } >
					<Modal.Header closeButton>
						<Modal.Title>Showing Symptoms Case</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Place Information</h5>
						<p className="mb-0"><strong>Address:</strong> { caseInfo.address }</p>
						<p className="mb-0"><strong>Date Visited:</strong> { dateVisited.toDateString() }</p>
						
						<h5 className="mt-4">Person Information</h5>
						<p className="mb-0"><strong>Showing Symptoms On:</strong> { symptomsDate.toDateString() }</p>
						<p className="mb-0"><strong>Age:</strong> { caseInfo.case.age }</p>
						{caseInfo.case.notes.length > 0 ? (
							<p><strong>Notes:</strong><br></br> { caseInfo.case.notes }</p>
						) : (
							null
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button 
							variant="light"
							onClick={ this.props.hideModal }>
							Close
						</Button>
					</Modal.Footer>
			</Modal>
		)
  }

}


export default ViewSymptomsCaseModal;
