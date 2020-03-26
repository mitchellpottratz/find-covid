import React from 'react';

// redux 
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions.js'

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
			isLoading: false
    }
	}
	
	handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

export default connect(mapStateToProps, {  })(Login); 