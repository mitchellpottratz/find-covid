import React from 'react';

import { Modal, Button } from 'react-bootstrap';


class ViewTestedPositiveModal extends React.Component {

  constructor(props) {
		super(props);
	}

	componentDidMount() {
		// this.getPlacesId();
	}

	// makes a request to the google geocode api to get the places id of the place visited
	// then the place id is used to get more information on the place visited
	// getPlacesId= () => {
	// 	fetch(
	// 		'https://maps.googleapis.com/maps/api/geocode/json?address=' +
	// 		this.props.caseInfo.address + 
	// 		'&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY
	// 		)
	// 		.then((response) => {
	// 			const parsedResponse = response.json();
	// 			return parsedResponse;
	// 		})
	// 		.then((parsedResponse) => {
	// 			console.log('response:', parsedResponse);
	// 			// const placeId = parsedResponse.results[0].place_id;
	// 			// this.getPlacesInformation(placeId);
	// 		});
	// }

	// makes a request to the google places api with the places id passed into the parameters
	// getPlacesInformation = (placeId) => {
	// 	fetch('http://localhost:8000/api/v1/places-visited/' + placeId + '/details')
	// 	.then((response) => {
	// 		const parsedResponse = response.json();
	// 		console.log('place details response:', parsedResponse);
	// 		return parsedResponse;
	// 	})
	// 	.then((parsedResponse) => {
	// 		console.log('places api response:', parsedResponse);
	// 	});
	// }
	
	
	render() {
		const { caseInfo } = this.props;

		const dateVisited = new Date(caseInfo.date_visited);
		const symptomsDate = new Date(caseInfo.case.symptoms_date);

		return (
			<Modal 
				show={ this.props.showModal }
				onHide={ this.props.hideModal } >
					<Modal.Header closeButton>
						<Modal.Title>Tested Positive</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Place Information</h5>
						<p className="mb-0"><strong>Address:</strong> { caseInfo.address }</p>
						<p className="mb-0"><strong>Date Visited:</strong> { dateVisited.toDateString() }</p>
						
						<h5 className="mt-4">Person Information</h5>
						<p className="mb-0"><strong>Showing Symptoms On:</strong> { symptomsDate.toDateString() }</p>
						<p className="mb-0"><strong>Age:</strong> { caseInfo.case.age }</p>
						{caseInfo.case.notes.length > 0 ? (
							<p><strong>Notes:</strong><br></br> { caseInfo.case.notes }</p>
						) : (
							null
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button 
							variant="light"
							onClick={ this.props.hideModal }>
							Close
						</Button>
					</Modal.Footer>
			</Modal>
		)
	}
}


export default ViewTestedPositiveModal;

