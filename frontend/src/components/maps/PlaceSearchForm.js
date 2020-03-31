import React from 'react';

import { Form } from 'react-bootstrap';
import { MDBListGroup, MDBListGroupItem } from "mdbreact"


class PlaceSearchForm extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Label>Search for a place nearby</Form.Label>
					
				</Form.Group>
			</Form>
		)
	}
  
}


export default PlaceSearchForm;


