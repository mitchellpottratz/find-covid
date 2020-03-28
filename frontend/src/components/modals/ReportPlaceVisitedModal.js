import React from 'react';

// redux 
import { connect } from 'react-redux';
import { createUsersPlaceVisited } from '../../actions/placesVisitedActions.js';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { GoogleComponent } from 'react-google-location'
import FormButton from '../common/FormButton.js';


class ReportPlaceVisitedModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			address: '',
			date_visited: new Date(),
			isLoading: false,
			formErrorMessages: []
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleDateChange = (date) => {
		this.setState({
			date_visited: date
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({
			formErrorMessages: [],
			isLoading: true
		});

		const response = await this.props.createUsersPlaceVisited(this.state);

		this.setState({ isLoading: false });

		// if the place visited was created then the modal is hidden
		if (response.status.code === 201) {
			this.props.hideModal();
		}
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
						<Form.Label>What is the address of this place?</Form.Label>
						<GoogleComponent
          		apiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }
          		language={ 'en' }
          		country={ 'country:in|country:us' }
          		coordinates={ true }
          		onChange={(e) => { this.setState({ address: e }) }} />
					</Form.Group>
					
					<Form.Group>
						<Form.Label>When did you visit this place?</Form.Label>
						<DatePicker
							className="w-100"
							value={ this.state.date_visited }
							onChange={ this.handleDateChange } />
					</Form.Group>

					<FormButton 
						variant="dark"
						text="Report"
						isLoading={ this.state.isLoading } />
				</Form>

				</Modal.Body>
    	</Modal>
		)
	}
}


export default connect(null, { createUsersPlaceVisited })(ReportPlaceVisitedModal);

