import React from "react";
import Logo from "../../logo.png";

// components
import { Card, Image } from "react-bootstrap";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

function AboutCards(props) {
  return (
    <React.Fragment>
      
      <Card className="text-center">
        <Card.Body>
          <div className="d-flex justify-content-between text-primary">
            <Image src={Logo} rounded width="25px" height="25px" />
            <FontAwesomeIcon className="large-icon" icon={faQuestion} />
            <span></span>
          </div>
          <Card.Title className="mt-3">What is Sympto+Map?</Card.Title>
          <p>
            Sympto+Map is a web-based application that allows you to know your
            risk of exposure to COVID-19 when you visit any location. Users who
            have been experiencing symptoms, been in contact with someone who
            has symptoms, or have been tested positive can post their recently
            visited locations.
          </p>
          <p>
            Sympto+Map should be used to bring awareness to the exposed
            locations in your area. Check the map next time you have to leave
            your home.
          </p>
          <FontAwesomeIcon
            className="large-icon text-primary"
            icon={faArrowsAltH}
          />
          <h5 className="text-primary">Swipe</h5>
        </Card.Body>
      </Card>

      <Card className="text-center">
        <Card.Body>
          <div className="d-flex justify-content-between text-primary">
            <Image src={Logo} rounded width="25px" height="25px" />
            <FontAwesomeIcon className="large-icon" icon={faQuestion} />
            <span></span>
          </div>
          <Card.Title className="mt-3">Keeping you Safe</Card.Title>
          <p>
            Sympto+Map relies on exposed user to post their visited locations.
            Locations visited by users who have been exposed, or tested positive
            for COVID-19 are marked with a
            <span className="text-danger"> red marker </span>.Sympto+Map helps
            you understand the risk of visiting a location.
          </p>
          <p>
            <strong>Be Safe. Be Aware.</strong>
          </p>
          <FontAwesomeIcon
            className="large-icon text-primary"
            icon={faArrowsAltH}
          />
          <h5 className="text-primary">Swipe</h5>
        </Card.Body>
      </Card>

    </React.Fragment>
  );
}

export default AboutCards;
