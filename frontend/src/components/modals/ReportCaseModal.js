import React from 'react';

// redux 
import { connect } from 'react-redux';
import {  } from '../../actions/userActions.js';

// components
import { Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


class ReportCaseModal extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			has_tested: false,
			symptoms_date: new Date()
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
		console.log('date changed to:', date);
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
	}

	render() {
    return (
    	<Modal show={ this.props.showModal } onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>Report Your Covid-19</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						className="py-3"
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
									selected={ this.state.symptoms_date }
									onChange={ (date) => this.handleDateChange(date) } />
							</Form.Group>
							<Form.Group>
								<Form.Label>Age</Form.Label>
								<Form.Control
									type="number"
									name="age"
									 />
							</Form.Group>
					</Form>
				</Modal.Body>
      </Modal>
    )
  }
}


export default connect(null, {})(ReportCaseModal);







