import React from 'react';

import { Modal, Spinner, ListGroup } from 'react-bootstrap';



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

		// information about the place is included in each case but only the case is needed
		const cases = parsedResponse.data.map(place => place.case);
	
		this.setState({ 
			cases: cases,
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
							<ListGroup>
							{this.state.cases.map((userCase, i) => {

							
								if (userCase.has_test) {
									return (
										<ListGroup.Item action variant="danger">
											{ userCase.age }
  									</ListGroup.Item>
									)

								} else {
									return (
										<ListGroup.Item action variant="warning">
											{ userCase.age }
  									</ListGroup.Item>
									)
								}

							
								return (
									<p>{ userCase.age }</p>

								)
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




