import React from 'react';
import Logo from "../../logo.png";

// redux 
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions.js';

// components
import { Container, Row, Col, Card, Form, Image } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import FormButton from '../common/FormButton.js';
import { Link, Redirect } from 'react-router-dom';


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone_number: '',
			password: '',
			isLoading: false,
			formErrorMessages: []
    }
	}
	
	handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handlePhoneNumberChange = (value) => {
    this.setState({ phone_number: value });
  }
	
	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({ 
			formErrorMessages: [],
			isLoading: true 
    });
    
    // removes the + and country code from the phone number 
    const formattedPhoneNumber = this.formatPhoneNumber();

    // copies the state so the formatted phone number can be set as the phone number 
    // without changing the state and so when a user fails to login their unformatted 
    // phone number wont be lost
    const loginInfo = this.makeACopyOfState();
    loginInfo.phone_number = formattedPhoneNumber;

    const response = await this.props.loginUser(loginInfo);

    // if the server encountered an error the message is displayed to the client
    if (response.status.code === 404) {
      this.setState({
        formErrorMessages: [...this.state.formErrorMessages, response.status.message]
      });
    }

    this.setState({ isLoading: false });
  }
  
  formatPhoneNumber = () => {
    const phoneNumberArray = this.state.phone_number.split('');
    phoneNumberArray.splice(0, 2);
    const formattedPhoneNumber = phoneNumberArray.join('');
    return formattedPhoneNumber;
  } 

  makeACopyOfState = () => {
    const clonedState = Object.assign({}, this.state);
    return clonedState;
  }

  render() {

		// if the user is logged in and they have not confirmed their phone number
    if (this.props.isLoggedIn && !this.props.phoneNumberConfirmed) {
      return (
        <Redirect to="/confirm-number" />
      )
    
    // if the user is logged in and they have already confirmed their phone number
    } else if (this.props.isLoggedIn && this.props.phoneNumberConfirmed) {
      return (
        <Redirect to="/map" />
      )
    }

    return (
      <Container>
        <Row className="py-4">
          <Col></Col>

          <Col lg={ 6 } md={ 8 } sm={ 12 }>
            <Card>
							<Card.Body>
                <div className="text-center">
									<Image 
										src={Logo}
										width="70px" 
										height="70px"
										className="mb-2" />
									<Card.Title>Login</Card.Title>
								</div>

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
                  onSubmit={ this.handleSubmit } >
									<Form.Group>
										<Form.Label>Phone Number</Form.Label>
										<Form.Label>Phone Number</Form.Label>
                      <PhoneInput 
                        placeholder="Enter your phone number"
                        value={ this.state.phone_number }
                        defaultCountry="US"
                        onChange={ (value) => this.handlePhoneNumberChange(value) } />
									</Form.Group>	
									<Form.Group className="mb-4">
										<Form.Label>Password</Form.Label>
                    <Form.Control 
                      required 
                      type="password"
                      placeholder="Password" 
                      name="password"
                      value={ this.state.password }
											onChange={ this.handleChange } 
                      />		
									</Form.Group>	

                  <FormButton 
                    variant="primary"
                    text="Login"
                    isLoading={ this.state.isLoading } 
                    />	
								</Form>
								<small>
                  Don't have an account? <Link to="/register">Register Here</Link>
                </small> 
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
		isLoggedIn: state.user.isLoggedIn,
		phoneNumberConfirmed: state.user.userInfo.phone_number_confirmed || false
  }
}

export default connect(mapStateToProps, { loginUser })(Login); 


