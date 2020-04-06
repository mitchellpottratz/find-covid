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
      <Container className="my-4">
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

        <Row>
          <Col></Col>
          <Col md={6} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">What is Sympto+Map?</Card.Title>
                <p>
                  Sympto+Map provides users with an extra layer of safety and comfort during this 
                  chaotic COVID-19 pandemic.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>

        <Row className="py-4">
          <Col lg={2} md={1} sm={0}></Col>
          <Col lg={4} md={5} sm={12} className="mt-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-center">Report Your Case</Card.Title>
                <p class="text-center">
                  <strong>
                    Have you been tested positive or shown symptoms of COVID-19?
                  </strong>
                </p>
                <p>
                  If so, it is crucial for your to <Link to="/register">sign up</Link> for Sympto+Map 
                  right now. Once signed up, you can report all of the public places you have visited 
                  while showing symptoms or being positive for COVID-19. The places you visited are 
                  shown on the map for other users to see and take into precautions before going out 
                  in public next.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={5} sm={12} className="mt-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-center">Take Precaution</Card.Title>
                <p className="text-center">
                  <strong>
                    Want to know if someone who goes to the same grocery has COVID-19?
                  </strong>
                </p>
                <p>
                  Sympto+Map's place search feature provides all users, whether signed up or not, with a solution. 
                  Our place search feature allows users to search for places near them such as; grocery stores, 
                  gas stations, restaurants, etc. To learn useful information about these places such as how many
                  people have visited that place while being positive for COVID-19.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={1} sm={0}></Col>
        </Row>

      </Container>
    );
  }
}

export default HomeContainer;
