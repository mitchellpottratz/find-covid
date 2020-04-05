import React from 'react';

import { Modal } from 'react';



class ViewPlaceModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
		return (
			<Modal
				show={ this.props.showModal }
				onHide={ this.props.hideModal }>
				<Modal.Header classButton>
					<Modal.Title>Place</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
			</Modal>
		)
  }

}


export default ViewPlaceModal;




