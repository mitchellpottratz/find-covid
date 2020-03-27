import React from 'react';

// redux 
import { connect } from 'react-redux';
import {  } from '../../actions/userActions.js';

// components
import { Modal } from 'react-bootstrap';


class ReportCaseModal extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
    return (
    	<Modal show={ this.props.showModal } onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Report Covid-19</Modal.Title>
				</Modal.Header>
      </Modal>
    )
  }
}


export default connect({}, {})(ReportCaseModal);







