import React from "react";

// redux
import { connect } from "react-redux";
import { confirmPhoneNumber } from "../../actions/userActions.js";

// components
import AuthCheck from "../common/AuthCheck.js";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import ReactCodeInput from "react-verification-code-input";
import FormButton from "../common/FormButton.js";
import { Redirect, Link } from "react-router-dom";

class ConfirmPhoneNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: [],
      isLoading: false,
      formErrorMessages: []
    };
  }

  handleChange = value => {
    this.setState({
      confirmationCode: [...value]
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      formErrorMessages: [],
      isLoading: true
    });

    const confirmationCode = this.state.confirmationCode.join("");
    const response = await this.props.confirmPhoneNumber(confirmationCode);

    if (response.status.code === 404) {
      // shows incorrect code error to the client
      this.setState({
        formErrorMessages: [
          ...this.state.formErrorMessages,
          response.status.message
        ]
      });
    }

    this.setState({ isLoading: false });
  };

  render() {
    // if the users phone number is confirmed
    if (this.props.userInfo.phone_number_confirmed) {
      return <Redirect to="/about" />;
    }

    return (
      <Container>

        <AuthCheck
          isLoggedIn={this.props.isLoggedIn}
          phoneNumberConfirmed={this.props.userInfo.phone_number_confirmed} />

        <Row className="py-4">
          <Col></Col>

          <Col md={6} sm={12}>
            <Card className="text-center px-4">
              <Card.Body>
                <Card.Title>Confirm your phone number</Card.Title>
                <p>
                  Thank you for signing up {this.props.userInfo.first_name}!
                </p>
                <p className="mb-1">
                  Please enter the confirmation code we sent to: <br></br>
                  <strong>{this.props.userInfo.phone_number}</strong>
                </p>

								<Link to="/change-number">
									Wrong phone number?
								</Link>

                {/* form error messages */}
                {this.state.formErrorMessages.map((message, i) => {
                  return (
                    <div key={i}>
                      <small className="text-danger">{message}</small>
                    </div>
                  );
                })}

                <Form className="py-3" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Enter Confirmation Code</Form.Label>
                    <ReactCodeInput
                      className="d-inline-block"
                      type="number"
                      fields={5}
                      values={this.state.confirmationCode}
                      onChange={value => this.handleChange(value)}
                    />
                  </Form.Group>

                  <FormButton
                    className="d-inline-block"
                    variant="primary"
                    text="Confirm"
                    isLoading={this.state.isLoading}
                  />
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo
  }
};

export default connect(mapStateToProps, { confirmPhoneNumber })(
  ConfirmPhoneNumber
);
