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

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleDateChange = (date) => {
		this.setState({
			name: '',
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
						<Form.Label>What is the name of this place?</Form.Label>
						<Form.Control 
							required
							type="text"
							name="name"
							placeholder="Name"
							value={ this.state.name }
							onChange={ this.handleChange } />
					</Form.Group>
					
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

