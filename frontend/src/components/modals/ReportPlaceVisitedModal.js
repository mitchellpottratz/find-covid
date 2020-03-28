import React from 'react';

// redux 
import { connect } from 'react-redux';

// components
import { Modal } from 'react-bootstrap';


class ReportPlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);
	}

  render() {
		return (
			<Modal 
				show={ this.props.showModal } 
				onHide={ this.props.hideModal }>
		  	<Modal.Header closeButton>
					<Modal.Title>Report Place Visited</Modal.Title>
				</Modal.Header>		
				<Modal.Body>
					report place visited form
				</Modal.Body>
    	</Modal>
		)
	}
}


export default connect(null, {})(ReportPlaceVisitedModal);

