import React from 'react';

// redux 
import { connect } from 'react-redux';

// components
import AuthCheck from '../common/AuthCheck.js';
import CovidFaqs from '../common/CovidFaqs.js';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import ReportCaseModal from '../modals/ReportCaseModal.js';
import MyPlacesVisited from './MyPlacesVisited.js';


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
									<Col md={ 12 } sm={ 12 }>
										<p className="mb-1">
											<strong>Tested Positive: </strong> { usersCase.has_tested }
										</p>
										<p className="mb-1">
											<strong>Symptoms Date: </strong> { usersCase.symptoms_date }
										</p>
										<p className="mb-0">	
											<strong>Age: </strong> { usersCase.age }
										</p>

										{/* the notes field is optional so it needs to check if it exists */}
										{usersCase.notes ? (
											<p className="mb-0">	
												<strong>Additional Information: </strong><br></br>
												{ usersCase.notes }
											</p>
										) : (
											null
										)}
										
										{/* Edit and delete buttons */}
										<div className="text-right">
											<Button 
												className="mr-2"
												variant="dark"
												>
												Edit
											</Button>
											<Button 
												variant="danger"
												>
												Delete
											</Button>
										</div>
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

						<MyPlacesVisited />			

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