import React from "react";
import Logo from "../../logo.png";

// redux 
import { connect } from 'react-redux';

// components
import { Container, CardDeck, Col, Row, Card, Image } from "react-bootstrap";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faHandsHelping,
  faUserSecret
} from "@fortawesome/free-solid-svg-icons";


class AboutContainer extends React.Component {

  doesNotHaveCase = () => {
    const usersCase = this.props.usersCase;
    for(var key in usersCase) {
      if (usersCase.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
    }
  
  
  render() {
    return (
      <Container className="py-4">

        {this.props.isLoggedIn && this.doesNotHaveCase() ? (
          <Card id="fixed-report-case-card">
            <Card.Body>
              <Card.Title></Card.Title>
            </Card.Body>
          </Card>
        ) : (
          null
        )}

        <CardDeck>
          <Card className="mb-4 text-center">
            <Card.Body>
              <div className="d-flex justify-content-between text-primary">
                <Image src={Logo} rounded width="25px" height="25px" />
                <FontAwesomeIcon className="large-icon" icon={faQuestion} />
                <span></span>
              </div>
              <Card.Title className="mt-3">What is Sympto+Map?</Card.Title>
              <p>
                Sympto+Map is a web-based application that allows you to know
                your risk of exposure to COVID-19 when you visit any location.
                Users who have been experiencing symptoms, been in contact with
                someone who has symptoms, or have been tested positive can post
                their recently visited locations.
              </p>
              <p>
                Sympto+Map should be used to bring awareness to the exposed
                locations in your area. Check the map next time you have to
                leave your home.
              </p>
            </Card.Body>
          </Card>
          <Card className="mb-4 text-center">
            <Card.Body>
              <div className="d-flex justify-content-between text-primary">
                <Image src={Logo} rounded width="25px" height="25px" />
                <FontAwesomeIcon className="large-icon" icon={faHandsHelping} />
                <span></span>
              </div>
              <Card.Title className="mt-3">Keeping you Safe</Card.Title>
              <p>
                Sympto+Map relies on exposed user to post their visited
                locations. Locations visited by users who have been exposed, or
                tested positive for COVID-19 are marked with a
                <span className="text-danger"> red marker </span>.Sympto+Map
                helps you understand the risk of visiting a location.
              </p>
              <p>
                <strong>Be Safe. Be Aware.</strong>
              </p>
            </Card.Body>
          </Card>
        </CardDeck>

        <Row>
          <Col md={2} sm={0}></Col>
          <Col md={8} sm={12}>
            <Card className="mb-4 text-center">
              <Card.Body>
                <div className="d-flex justify-content-between text-primary">
                  <Image src={Logo} rounded width="25px" height="25px" />
                  <FontAwesomeIcon className="large-icon" icon={faUserSecret} />
                  <span></span>
                </div>
                <Card.Title className="mt-3">Your Privacy</Card.Title>
                <p>
                  We only ask for your location to set the city displayed on your map 
                  for searching for relevent places in your area. We offer our users 
                  the option to enter their city manually instead of using their current
                  location. Without a set current location or city set on the map; the 
                  places you search for could be halfway around the world.
                </p>
                <p>
                  <strong>
                    Sympto+Map allows you to save lives and slow the spread in your community
                  </strong>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} sm={0}></Col>
        </Row>

      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    usersCase: state.cases.usersCase
  }
}

export default connect(mapStateToProps, {})(AboutContainer);


