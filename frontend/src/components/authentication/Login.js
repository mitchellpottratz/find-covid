import React from 'react';

// redux 
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions.js'

// components
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
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
	
	handleSubmit = async (e) => {
		e.preventDefault();

		this.setState({ 
			formErrorMessages: [],
			isLoading: true 
		});

		const response = await this.props.loginUser(this.state);

    // if the server encountered an error the message is displayed to the client
    if (response.status.code === 404) {
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

          <Col md={ 8 } sm={ 12 }>
            <Card>
							<Card.Body>
              	<Card.Title>Login</Card.Title>

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
										<Form.Control 
                      required 
                      type="text"
                      placeholder="Phone Number" 
                      name="phone_number"
                      value={ this.state.phone_number }
											onChange={ this.handleChange } 
                      />
									</Form.Group>	
									<Form.Group>
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
                    variant="dark"
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
    isLoggedIn: state.user.isLoggedIn
  }
}

export default connect(mapStateToProps, { loginUser })(Login); 


