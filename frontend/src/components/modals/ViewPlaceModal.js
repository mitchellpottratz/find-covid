import React from 'react';

import { Modal } from 'react-bootstrap';



class ViewPlaceModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
		return (
			<Modal
				show={ this.props.showModal }
				onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Place</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
			</Modal>
		)
  }

}


export default ViewPlaceModal;




