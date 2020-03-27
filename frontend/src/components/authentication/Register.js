import React from 'react';

// redux 
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions.js'

// components
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import FormButton from '../common/FormButton.js';
import { Link, Redirect } from 'react-router-dom';


class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
      confirmed_password: '',
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

    // makes api call to register the user
    const response = await this.props.registerUser(this.state);

    // if the server encountered an error the message is displayed to the client
    if (response.status.code === 404) {
      this.setState({
        formErrorMessages: [...this.state.formErrorMessages, response.status.message]
      });
    }

    this.setState({ isLoading: false });
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

          <Col md={ 8 } sm={ 12 }>
            <Card>
              <Card.Body>
                <Card.Title>Register</Card.Title>

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

                  <Row>
                    <Col md={ 6 } sm={ 12 }>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          required 
                          type="text"
                          placeholder="First Name" 
                          name="first_name"
                          value={ this.state.first_name }
												  onChange={ this.handleChange } 
                          />
                      </Form.Group>
                    </Col>
                    <Col md={ 6 } sm={ 12 }>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          required 
                          type="text"
                          placeholder="Last Name" 
                          name="last_name"
                          value={ this.state.last_name }
												  onChange={ this.handleChange } 
                          />
                      </Form.Group>
                    </Col>
                  </Row>

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

                  <Row>
                    <Col md={ 6 } sm={ 12 }>
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
                    </Col>
                    <Col md={ 6 } sm={ 12 }>
                      <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                          required 
                          type="password"
                          placeholder="Confirm Password" 
                          name="confirmed_password"
                          value={ this.state.confirmed_password }
												  onChange={ this.handleChange } 
                          />
                      </Form.Group>
                    </Col>
                  </Row>

                  <FormButton 
                    variant="dark"
                    text="Register"
                    isLoading={ this.state.isLoading } 
                    />
                </Form>
                <small>
                  Already have an account? <Link to="/login">Login Here</Link>
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

export default connect(mapStateToProps, { registerUser })(Register);



