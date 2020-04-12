import React from 'react';

// redux
import { connect } from "react-redux";
import { confirmPhoneNumber } from "../../actions/userActions.js";

// components
import { Container, Row, Col, Card } from 'react-bootstrap'; 


class ChangePhoneNumber extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <p>change phone number</p>
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

export default connect(mapStateToProps, {})(ChangePhoneNumber);

