import React from 'react';

// redux 
import { connect } from 'react-redux';

// components
import { Row, Col, Button } from 'react-bootstrap';
import ReportPlaceVisitedModal from '../modals/ReportPlaceVisitedModal.js';
import DeletePlaceVisitedModal from '../modals/DeletePlaceVisitedModal.js';
import PlaceVisitedCard from '../common/PlaceVisitedCard.js';


class MyPlacesVisited extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showReportPlaceVisitedModal: false,
			showDeletePlaceVisitedModal: false,
			placeVisitedToDelete: {}
		}
	}

	showReportPlaceVisitedModal = () => {
		this.setState({ showReportPlaceVisitedModal: true });
	} 

	hideReportPlaceVisitedModal = () => {
		this.setState({ showReportPlaceVisitedModal: false });
	} 

	showDeletePlaceVisitedModal = (placeVisitedToDelete) => {
		this.setState({
			showDeletePlaceVisitedModal: true,
			placeVisitedToDelete: placeVisitedToDelete
		});
	}

	hideDeletePlaceVisitedModal = () => {
		this.setState({
			showDeletePlaceVisitedModal: false,
			placeVisitedToDelete: {}
		});
	}

  render() {
  	return (
			<React.Fragment>

				{/* Modal for reporting a place the user has visited */}
				<ReportPlaceVisitedModal 
					showModal={ this.state.showReportPlaceVisitedModal }
					hideModal={ this.hideReportPlaceVisitedModal }
					usersCase={ this.props.usersCase }
				/>

				{/* Modal for deleting a place the user has visited */}
				<DeletePlaceVisitedModal 
					showModal={ this.state.showDeletePlaceVisitedModal }
					hideModal={ this.hideDeletePlaceVisitedModal }
					placeVisited={ this.state.placeVisitedToDelete }
				/>

  			<div className="mt-4">  
					<h5>Places Visited</h5>
					<p>
						Please report all of the places you have visited within the last 7 of when you started 
						to show symptoms
					</p>
					<Button 
						variant="light" 
						onClick={ this.showReportPlaceVisitedModal }>
						Report Place Visited
					</Button>

					<Row className="py-4">
						{/* Shows all of the places the user has visited */}
						{this.props.usersPlacesVisited.map((placeVisited, i) => {
							return (
								<Col key={ i } md={ 6 } sm={ 12 }>
									<PlaceVisitedCard 
										placeVisited={ placeVisited }
										deleteButtonOnClick={ this.showDeletePlaceVisitedModal } />
								</Col>
							)
						})}
					</Row>

    		</div>
			</React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
	return {
		usersPlacesVisited: state.placesVisited.usersPlacesVisited
	}
}

export default connect(mapStateToProps, {})(MyPlacesVisited);


