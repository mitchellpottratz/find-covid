import React from "react";
import Logo from "../../logo.png";

import { Container, Jumbotron, Image, Row, Col, Card } from "react-bootstrap";
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
            <Image src={Logo} width="100px" height="100px"/>
            <h3 className="mt-3 mb-4">
              <strong>Know your risk of exposure</strong>
            </h3>
            <h4 className="mb-4">to COVID-19 the next time you</h4>
            <h4>leave your house...</h4>
            <div class="d-block justify-content-center mt-4">
              <Link className="btn btn-sm btn-primary mr-4" to="/map">
                View Map
              </Link>
              <Link className="btn btn-sm btn-primary" to="/register">
                Get Started
              </Link>
            </div>
          </Container>
        </Jumbotron>



      </Container>
    );
  }
}

export default HomeContainer;
