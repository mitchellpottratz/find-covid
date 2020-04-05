import React from 'react';

import { Modal, Spinner, ListGroup, Badge } from 'react-bootstrap';



class ViewPlaceModal extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			cases: [],
			isLoading: true
		}
	}
	
	componentDidMount() {
		this.getAllCases();
	}

	// gets all of the reported cases for this place
	getAllCases = async () => {
		const googlePlaceId = this.props.place.google_place_id;

		const response = await fetch(process.env.REACT_APP_API_URL + 'places-visited/' + googlePlaceId);
		const parsedResponse = await response.json();
	
		this.setState({ 
			cases: parsedResponse.data,
			isLoading: false 
		});
	}

  render() {
		const place = this.props.place;

		return (
			<Modal
				show={ this.props.showModal }
				onHide={ this.props.hideModal }>
				<Modal.Header closeButton>
					<Modal.Title>{ place.name }</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.isLoading ? (
						<div class="text-center py-4">
							<Spinner 
								animation="border"
								variant="primary" />
								<p class="text-primary mt-2">Collecting Cases...</p>
						</div>
					) : (
						<React.Fragment>
							<h6 class="pb-3">{ place.address }</h6>
							<h5>Reported Cases</h5>
							<p>
								The reports below are from users who have tested positive or have shown symptoms of 
								COVID-19 and visited <strong>{ place.name }</strong>
							</p>							
							<ListGroup>
							{this.state.cases.map((userCase, i) => {
							
								// if the case is from a person who has tested positive
								if (userCase.case.has_tested) {
									return (
										<ListGroup.Item 
											key={i}
											variant="danger">
											<div>
												<Badge variant="danger">Tested Positive</Badge>
											</div>

											<div>
												<p class="mt-2 mb-1">
													Reported having symptoms on 
													<strong> { new Date(userCase.case.symptoms_date).toDateString() }</strong>
												</p>
												<p class="my-1">
													Visited <strong> { place.name }</strong> on
													<strong> { new Date(userCase.date_visited).toDateString() }</strong>
												</p>
												<p class="my-1">
													<strong>{ userCase.case.age }</strong> years old
												</p>
											</div>
  									</ListGroup.Item>
									)

								// otherwise if the case is from a person who has just been
								// showing symptoms
								} else {
									return (
										<ListGroup.Item 
											key={i}
											variant="warning">
											<div>
												<Badge variant="warning">Symptoms</Badge>
											</div>

											<div>
												<p class="mt-2 mb-1">
													Reported having symptoms on 
													<strong> { new Date(userCase.case.symptoms_date).toDateString() }</strong>
												</p>
												<p class="my-1">
													Visited <strong> { place.name }</strong> on
													<strong> { new Date(userCase.date_visited).toDateString() }</strong>
												</p>
												<p class="mt-1">
													<strong>{ userCase.case.age }</strong> years old
												</p>
											</div>
  									</ListGroup.Item>
									)
								}

							})}
							</ListGroup>
						</React.Fragment>
					)}

				</Modal.Body>
			</Modal>
		)
  }

}


export default ViewPlaceModal;




