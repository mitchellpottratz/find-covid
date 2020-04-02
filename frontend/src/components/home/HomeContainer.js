import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import CovidStatsCard from './CovidStatsCard.js';


class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
		return (
			<Container className="mt-4">
				<Row>
					<Col md={4} sm={12}>
						<CovidStatsCard />
					</Col>
					<Col md={8} sm={12}>
					
					</Col>
				</Row>
			</Container>

		)
	}

}


export default HomeContainer;
