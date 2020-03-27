import React from 'react';

// redux 
import { connect } from 'react-redux';
import { confirmPhoneNumber } from '../../actions/userActions.js'

// components
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import ReactCodeInput from 'react-verification-code-input';
import FormButton from '../common/FormButton.js';
import { Link, Redirect } from 'react-router-dom';


class ConfirmPhoneNumber extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			confirmationCode: [],
			isLoading: false,
			formErrorMessages: []
    }
	}

	handleChange = (value) => {
		this.setState({
			confirmationCode: [...this.state.confirmationCode, value]
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({
			formErrorMessages: [],
			isLoading: true
		});

		const response = await this.props.confirmPhoneNumber(this.state.confirmationCode);
		console.log('response:', response);
		
		if (response.status.code === 404) {

			// shows incorrect code error to the client
			this.setState({
				formErrorMessages: [...this.state.formErrorMessages, response.status.message]
			});
		}		

		this.setState({ isLoading: false });
	}
	
	render() {
		return (
			<Container>
				<Row className="py-4">
					<Col></Col>

					<Col md={ 6 } sm={ 12 }>
						<Card className="text-center px-4">
							<Card.Body>
								<Card.Title>Confirm your phone number</Card.Title>
								<p>
									Thank you for signing up { this.props.userInfo.first_name }!
								</p>
								<p>
									Please enter the confirmation code we sent to: <br></br> 
									<strong>{ this.props.userInfo.phone_number }</strong>
								</p>	

								{/* form error messages */}
                {this.state.formErrorMessages.map((message, i) => {
                      return (
                        <div key={ i }>
										      <small className="text-danger">{ message }</small>
									      </div>
                      )
                  })}

								<Form 
									className="py-3"
									onSubmit={ this.handleSubmit }>

									<Form.Group>
										<Form.Label>Enter Confirmation Code</Form.Label>
										<ReactCodeInput 
											className="d-inline-block"
											type="number"
											fields={ 5 } 
											values={ this.state.confirmationCode }
											onChange={ (value) => this.handleChange(value) } />
									</Form.Group>	

									<FormButton
										className="d-inline-block"
										variant="dark"
										text="Confirm"
										isLoading={ this.state.isLoading } />
								</Form>

							</Card.Body>
						</Card>
					</Col>

					<Col></Col>
				</Row>
			</Container>
		)
	}

}


const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, { confirmPhoneNumber })(ConfirmPhoneNumber);