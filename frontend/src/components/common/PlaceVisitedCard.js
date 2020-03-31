import React from 'react';

import { Card, Button } from 'react-bootstrap';


function PlaceVisitedCard(props) {
	const placeVisited = props.placeVisited;
	const dateVisited = new Date(placeVisited.date_visited);

  return (
		<Card className="mt-4">
			<Card.Body>
				<Card.Title>{ placeVisited.name }</Card.Title>
				<p>{ placeVisited.address }</p>
				<p>
					Visited on <strong>{ dateVisited.toDateString() }</strong>
				</p>
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

