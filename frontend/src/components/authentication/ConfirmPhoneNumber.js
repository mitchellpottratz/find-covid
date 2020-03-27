import React from 'react';

// redux 
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions.js'

// components
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import FormButton from '../common/FormButton.js';
import { Link, Redirect } from 'react-router-dom';


class ConfirmPhoneNumber extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			code: ''
    }
	}

	handleChange = (e) => {
		this.setState({
			code: e.target.value
		});
	}
	
	render() {
		return (
			<Container>
				<Row>
					<Col></Col>

					<Col md={ 6 } sm={ 12 }>
						<Card>
							<Card.Body>
								<Card.Title>Confirm your phone number</Card.Title>

							</Card.Body>
						</Card>
					</Col>

					<Col></Col>
				</Row>
			</Container>
		)
	}

}


const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, { })(ConfirmPhoneNumber);
