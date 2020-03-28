import React from 'react';

// redux 
import { connect } from 'react-redux';
import {  } from '../../actions/userActions.js';

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
			address: '',
			notes: '',
			isLoading: false
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
	
	handleSubmit = (e) => {
		e.preventDefault();

		
	}

	render() {
    return (
    	<Modal show={ this.props.showModal } onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Report Covid-19</Modal.Title>
				</Modal.Header>
				<Modal.Body>

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
								<Form.Label>What's your address?</Form.Label>
								<GoogleComponent
									apiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }
          				language={'en'}
          				country={'country:in|country:us'}
									coordinates={true}
									name="address"
									value={ this.state.address }
          				onChange={value => {
										this.setState({ address: value });
									}} />	
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


export default connect(null, {})(ReportCaseModal);







