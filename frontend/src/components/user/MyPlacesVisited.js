import React from 'react';

// redux 
import { connect } from 'react-redux';

// components
import { Button } from 'react-bootstrap';
import ReportPlaceVisitedModal from '../modals/ReportPlaceVisitedModal.js';


class MyPlacesVisited extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showReportPlaceVisitedModal: false
		}
	}

  render() {
  	return (
			<React.Fragment>
				<ReportPlaceVisitedModal />
  			<div className="mt-4">  
					<h5>Places Visited</h5>
					<p>
						Report all of the places you have visited within the last 7 of when you started 
						to show symptoms.
					</p>
					<Button 
						variant="light" >
						Report Place Visited
					</Button>
    		</div>
			</React.Fragment>
    )
  }
}


export default connect(null, {})(MyPlacesVisited);


