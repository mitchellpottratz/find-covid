import React from 'react';

// redux 
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions.js';

// components
import AuthCheck from '../common/AuthCheck.js';
import CovidFaqs from '../common/CovidFaqs.js';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import ReportCaseModal from '../modals/ReportCaseModal.js';


class MyCase extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			showReportCaseModal: false
		}
	}
	
	showReportCaseModal = () => {
		this.setState({ showReportCaseModal: true });
	}

	hideReportCaseModal = () => {
		this.setState({ showReportCaseModal: false });
	}

  render() {
		const { isLoggedIn, userInfo, usersCase } = this.props;

    return (
			<Container>

				{/* Authenticates the user is logged in and has confirmed their phone number */}
      	<AuthCheck 
        	isLoggedIn={ this.props.isLoggedIn } 
      		phoneNumberConfirmed={ this.props.userInfo.phone_number_confirmed } />

				{/* if the user has a case reported they will not be able to open the ReportCaseModal */}
				{usersCase ? (
					null

				// if the user has not reported a case they will be able to open the ReportCaseModal
				) : (
					<ReportCaseModal 
						showModal={ this.state.showReportCaseModal }
						hideModal={ this.hideReportCaseModal } />
				)}
				
				<Row className="mt-4">

					{/* Faqs about COVID-19 */}
					<Col md={ 4 } sm={ 12 }>
						<CovidFaqs />
					</Col>

					<Col md={ 8 } sm={ 12 }>
						<Card bg="light">
							<Card.Body>
								<Card.Title>Your Reported Case</Card.Title>

								{/* if the user has reported a case */}
								{usersCase ? (
								<Row>
									<Col md={ 6 } sm={ 12 }>
										<p>
											<stong>Tested Positive: </stong> { usersCase.has_test }
										</p>
									</Col>
								</Row>

								// if the user has not reported a case yet
								) : (
								<div className="text-center">
									<p className="mb-1"><strong>Have you:</strong></p>
									<p className="mb-0">Been experiencing symptoms of Coronavirus/Covid-19?</p>
									<p className="mb-0"><strong>or</strong></p>
									<p>Tested positive for Coronavirus/Covid-19?</p>
									<Button
				  					variant="dark"
										onClick={ this.showReportCaseModal }>
										Report Symptoms
									</Button>
								</div>
								)}
							</Card.Body>
						</Card>
					</Col>	
				</Row>	
			</Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        usersCase: state.cases.usersCase
    }
}

export default connect(mapStateToProps, {})(MyCase);