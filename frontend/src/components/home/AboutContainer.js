import React from "react";
import Logo from "../../logo.png";

// components
import { Container, Card, Image } from "react-bootstrap";
import TinderCard from 'react-tinder-card';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";


class AboutContainer extends React.Component {

  swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
  }

  outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  render() {

    return (
      <Container className="py-4">
        <TinderCard 
          className='swipe-card' 
          onSwipe={(dir) => this.swiped(dir, 'something')} 
          onCardLeftScreen={() => this.outOfFrame('something')}>
            
          <Card className="text-center">
            <Card.Body>
              <div className="d-flex justify-content-between text-primary">
                <Image src={ Logo } rounded width="25px" height="25px" />
                <FontAwesomeIcon 
                  className="large-icon" 
                  icon={ faQuestion } />
                <span></span>
              </div>
              <Card.Title className="mt-3">What is Sympto+Map?</Card.Title>
              <p>
                Sympto+Map is a web-based application that allows you to know your risk of exposure to COVID-19
                when you visit any location. Users who have been experiencing symptoms, been in contact with 
                someone who has symptoms, or have been tested positive can post their recently visited locations. 
              </p>
              <p>
                Sympto+Map should be used to bring awareness to the exposed locations in your area. Check the map 
                next time you have to leave your home.
              </p>
              <FontAwesomeIcon 
                className="large-icon text-primary" 
                icon={ faArrowsAltH } />
                <h5 className="text-primary">Swipe</h5>
            </Card.Body>
          </Card>


          </TinderCard>
      </Container>
    );
  }
}

export default AboutContainer;
