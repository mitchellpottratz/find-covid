import React from 'react';

// redux 
import { connect } from 'react-redux';
import { setUsersCase } from '../../actions/casesActions.js';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { GoogleComponent } from "react-google-location";
import FormButton from '../common/FormButton.js';


class ReportCaseModal extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			has_tested: false,
			symptoms_date: new Date(),
			age: '',
			zip_code: '',
			notes: '',
			isLoading: false,
			formErrorMessages: []
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleCheckBoxChange = (e) => {
		this.setState({
			has_tested: e.target.checked
		});
	}

	handleDateChange = (date) => {
		this.setState({
			symptoms_date: date
		});
	}
	
	handleSubmit = async (e) => {
		e.preventDefault();

		await this.setState({
			formErrorMessages: [],
			isLoading: true
		});

		if (this.zipCodeIsValid()) {
			this.props.setUsersCase(this.state)
		}

		this.setState({ isLoading: false });
	}

	zipCodeIsValid = () => {
		const zipCodeErrorMessage = 'Please provide a valid zip code';
		const zipCode = this.state.zip_code;

		// if the zip code length is not 5 then its invalid
		if (zipCode.length !== 5) {
			this.setState({
				formErrorMessages: [...this.state.formErrorMessages, zipCodeErrorMessage]
			});
			return false
		}
		
		zipCode.split('').forEach((digit) => {
			// if the current digit is not a number then its invalid 
			if (isNaN(parseInt(digit))) {
				this.setState({
					formErrorMessages: [...this.state.formErrorMessages, zipCodeErrorMessage]
				});
				return false;
			}	
		});

		return true;
	}

	render() {
    return (
    	<Modal show={ this.props.showModal } onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Report Covid-19</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					{/* form error messages */}
					{this.state.formErrorMessages.map((message, i) => {
          	return (
            	<div key={ i }>
								<small className="text-danger">{ message }</small>
							</div>
            )
          })}

					<Form
						className="py-3 text-center"
						onSubmit={ this.handleSubmit } >

							<Form.Group>
								<Form.Check
									type="checkbox"
									label="Have you tested positive?"
									name="has_tested" 
									checked={ this.state.has_tested }
									onChange={ this.handleCheckBoxChange } />		
							</Form.Group>	
							<Form.Group>
								<Form.Label>Date you started showing symptoms:</Form.Label><br></br>
								<DatePicker
									className="w-100"
									value={ this.state.symptoms_date }
									onChange={ this.handleDateChange } />
							</Form.Group>
							<Form.Group>
								<Form.Label>What is your age?</Form.Label>
								<Form.Control
									type="number"
									name="age"
									placeholder="Age"
									value={ this.state.age }
									onChange={ this.handleChange } />
							</Form.Group>

							<Form.Group>
								<Form.Label>What's your zip code?</Form.Label>
								<Form.Control 
									type="text"
									name="zip_code"
									placeholder="Zip Code"
									value={ this.state.zip_code }
									onChange={ this.handleChange } />
							</Form.Group>

							<Form.Group>
									<Form.Label>Extra information you would like to add</Form.Label>
									<Form.Control 
										as="textarea"
										rows="3"
										name="notes"
										value={ this.state.notes }
										onChange={ this.handleChange } />
							</Form.Group>

							<FormButton 
								variant="dark"
								text="Next"
							  isLoading={ this.state.isLoading } />
					</Form>

				</Modal.Body>
      </Modal>
    )
  }
}


export default connect(null, { setUsersCase })(ReportCaseModal);







