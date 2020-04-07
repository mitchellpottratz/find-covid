import React from "react";

import { connect } from "react-redux";
import { resetPassword } from "../../actions/userActions.js";

// components
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import FormButton from "../common/FormButton.js";
import { Link, Redirect } from "react-router-dom";

class PasswordResetForm extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      phone_number: "",
      formErrorMessages: [],
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      formErrorMessages: [],
      isLoading: true,
    });

    const response = await this.props.resetPassword(this.state.phone_number);
    console.log(response);

    // if the server encountered an error the message is displayed to the client
    if (response.status.code === 404) {
      this.setState({
        formErrorMessages: [
          ...this.state.formErrorMessages,
          response.status.message,
        ],
      });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Container>
        <Row className="py-4">
          <Col></Col>

          <Col md={8} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>Password Reset</Card.Title>

                <Form className="py-3" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder="Phone Number"
                      name="phone_number"
                      value={this.state.phone_number}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <FormButton variant="dark" text="Send Confirmation Text" />
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVerifiedToResetPassword: state.isVerifiedToResetPassword,
  };
};

export default connect(mapStateToProps, { resetPassword })(PasswordResetForm);
