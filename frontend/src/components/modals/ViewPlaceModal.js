import React from 'react';

import { Modal, Spinner, ListGroup, Badge } from 'react-bootstrap';



class ViewPlaceModal extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			cases: [],
			symptomCasesCount: 0,
			testedPositiveCasesCount: 0,
			isLoading: true
		}
	}
	
	async componentDidMount() {
		await this.getAllCases();
		this.getCasesCount();
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

	getCasesCount = () => {
		let symptomsCount = 0;
		let testedCount = 0;
		this.state.cases.forEach((currentCase) => {
			if (currentCase.case.has_tested) {
				testedCount++;
			} else {
				symptomsCount++;
			}
		});

		this.setState({ 
			symptomCasesCount: symptomsCount,
			testedPositiveCasesCount: testedCount
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
						<div className="text-center py-4">
							<Spinner 
								animation="border"
								variant="primary" />
								<p className="text-primary mt-2">Collecting Cases...</p>
						</div>
					) : (
						<React.Fragment>
							<h6 class="pb-3 text-center">{ place.address }</h6>

							<div className="d-flex justify-content-center text-center">
								<div className="w-50 text-warning">
									<p className="large-text mb-0">{ this.state.symptomCasesCount }</p>
									<p>Symptoms/In Contact</p>
								</div>
								<div className="w-50 text-danger">
									<p className="large-text mb-0">{ this.state.testedPositiveCasesCount }</p>
									<p>Tested Positive</p>
								</div>
							</div>

							<h5>Reported Cases</h5>						
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
												<Badge variant="warning">Symptoms/In Contact</Badge>
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




