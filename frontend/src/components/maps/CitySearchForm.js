import React from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import FormButton from '../common/FormButton.js';


class CitySearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			city: '',
			isLoading: false
		}
	}

	handleChange = (e) => {
		this.setState({
			city: e.target.value
		});
	}
	
	render() {
		return (
			<Form>
				<Row>
					<Col md={ 8 } sm={ 9 }>
							<Form.Control 
								type="text"
								placeholder="Search for a City"
								name="city"
								value={ this.state.city }
								onChange={ this.handleChange } />
	
					</Col>
					<Col md={ 4 } sm={ 3 }>
						<FormButton 
							variant="dark"
							text="Search"
							isLoading={ this.state.isLoading } />
					</Col>
				</Row>
					
			</Form>
		)
	}
}


export default CitySearchForm;


