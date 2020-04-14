import React, { useState } from "react";

// components
import { Container } from "react-bootstrap";
import AboutCards from './AboutCards.js';


class AboutContainer extends React.Component {

  render() {
    return (
      <Container className="py-4">
        <AboutCards />
      </Container>
    )
  }
}


export default AboutContainer; 