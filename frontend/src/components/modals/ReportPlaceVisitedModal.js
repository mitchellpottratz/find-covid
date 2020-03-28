import React from 'react';

// redux 
import { connect } from 'react-redux';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import FormButton from '../common/FormButton.js';


class ReportPlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			date_visited: new Date()
		}
	}

	handleDateChange = (date) => {
		this.setState({
			date_visited: date
		});
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
					
				<Form
					className="py-3 text-center"
					onSubmit={ this.handleSubmit } >
					
					<Form.Group>
						<Form.Label>When did you visit this place?</Form.Label>
						<DatePicker
							className="w-100"
							value={ this.state.date_visited }
							onChange={ this.handleDateChange } />
					</Form.Group>
				</Form>

				</Modal.Body>
    	</Modal>
		)
	}
}


export default connect(null, {})(ReportPlaceVisitedModal);

