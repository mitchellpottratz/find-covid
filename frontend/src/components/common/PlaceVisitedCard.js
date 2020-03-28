import React from 'react';

import { Card, Button } from 'react-bootstrap';


function PlaceVisitedCard(props) {
  const placeVisited = props.placeVisited;
  


  return (
		<Card className="mt-4">
			<Card.Body>
				<Card.Title>{ placeVisited.name }</Card.Title>
				<p>{ placeVisited.address.place }</p>
				<p>{ placeVisited.date_visited }</p>
				<Button 
					variant="danger" 
          onClick={ () => props.deleteButtonOnClick(placeVisited) }>
          Delete    
				</Button>
			</Card.Body>
		</Card>
  )
}


export default PlaceVisitedCard;

