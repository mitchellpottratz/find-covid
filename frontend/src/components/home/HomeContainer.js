import React from "react";

import { Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="mt-4">
        <Jumbotron fluid>
          <Container className="text-center">
            <h2 className="mb-4">
              <strong>Know your risk of exposure</strong>
            </h2>
            <h3 className="mb-4">to COVID-19 the next time you</h3>
            <h3>leave your house...</h3>
            <Link className="btn btn-primary mt-4" to="/register">
              Get Started
            </Link>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}

export default HomeContainer;
