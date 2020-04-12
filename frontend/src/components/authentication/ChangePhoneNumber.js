import React from 'react';

// redux
import { connect } from "react-redux";
import { changeUsersPhoneNumber } from "../../actions/userActions.js";

// components
import { Container, Row, Col, Card, Form } from 'react-bootstrap'; 
import PhoneInput from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import FormButton from "../common/FormButton.js";


class ChangePhoneNumber extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phone_number: '',
      isLoading: false
    }
  }

  handlePhoneNumberChange = (value) => {
    this.setState({ phone_number: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const response = await this.props.changeUsersPhoneNumber(this.state.phone_number);

    if (response.status.code === 204) {
     
    }

    this.setState({ isLoading: false });
  }


  render() {
    return (
      <Container>
        <Row className="py-4">
          <Col></Col>
          <Col md={6} sm={12}>
            <Card className="text-center">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Link to="/confirm-number">
                    Back
                  </Link>
                  <Card.Title>Change Phone Number</Card.Title>
                  <span></span>
                </div>
                <Form 
                  className="py-3"
                  onSubmit={ this.handleSubmit }>
                  <Form.Group className="pb-2">
                    <Form.Label>Enter new phone number</Form.Label>
                    <PhoneInput 
                      placeholder="Enter your phone number"
                      value={ this.state.phone_number }
                      defaultCountry="US"
                      onChange={ (value) => this.handlePhoneNumberChange(value) } />
                  </Form.Group>
                  <FormButton
                    variant="primary"
                    text="Change Number"
                    isLoading={this.state.isLoading} />
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
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps, { changeUsersPhoneNumber })(ChangePhoneNumber);

