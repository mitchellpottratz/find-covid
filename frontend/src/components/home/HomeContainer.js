import React from "react";
import Logo from "../../logo.png";

// components
import {
  Container,
  Jumbotron,
  Image,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHelping, faHeart } from "@fortawesome/free-solid-svg-icons";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="my-4">
        <Jumbotron fluid>
          <Container className="text-center">
            <Image src={Logo} width="100px" height="100px" />
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
              <br />
              <br />
              <Button className="btn btn-sm btn-primary">Tutorial</Button>
            </div>
          </Container>
        </Jumbotron>

        <Row>
          <Col></Col>
          <Col md={6} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  What is Sympto+Map?
                </Card.Title>
                <p>
                  Sympto+Map provides users with an extra layer of safety and
                  comfort during this chaotic COVID-19 pandemic.
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
                <div class="text-primary text-center pb-2">
                  <FontAwesomeIcon icon={faHandsHelping} />
                  <Card.Title>Make a Difference.</Card.Title>
                  <hr class="bg-primary"></hr>
                </div>
                <p class="text-center">
                  <strong>
                    Have you displayed symptoms, been in contact with someone
                    with symptoms, or tested positive for COVID-19?
                  </strong>
                </p>
                <p>
                  If so, <Link to="/register">sign up</Link> now to help prevent
                  the spread of COVID-19 in your community. As a regisered user,
                  your identity is completely anonymous. You will be able to
                  report all places you have visited, so people in your
                  community can be aware of their risk of exposure.
                </p>
                <p class="font-italic text-center">Saving lives made simple</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={5} sm={12} className="mt-3">
            <Card className="h-100">
              <Card.Body>
                <div class="text-primary text-center pb-2">
                  <FontAwesomeIcon icon={faHeart} />
                  <Card.Title className="text-center">
                    Be Aware. Be Safe
                  </Card.Title>
                  <hr class="bg-primary"></hr>
                </div>

                <p className="text-center">
                  <strong>
                    The next time you go to the grocery store–– would you like
                    to know you risk of exposure to COVID-19?
                  </strong>
                </p>
                <p>
                  Sympto+Map provides you with the answer to the question––
                  whether you are signed up or not. It works just like any other
                  map or GPS application. You can search for any location and
                  instantly know when and how many people have visited the
                  location who have symptoms, been in contact with someone with
                  symptoms, or tested positive for COVID-19.
                </p>
                <p class="font-italic text-center">
                  Don't leave home without checking Sympto+Map
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
