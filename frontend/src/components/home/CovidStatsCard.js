import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';


class CovidStatsCard extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			confirmed: '',
			recovered: '',
			critical: '',
			deaths: '',
			isLoading:
		}
	}

	componentDidMount() {
		// this.getCovidStats();
	}
	
	getCovidStats = async () => {
		const response = await fetch(
			"https://covid-19-data.p.rapidapi.com/totals?format=json", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_XRAPID_API_KEY
			}
		});
		const parsedResponse = await response.json();

		this.setState({
			confirmed: parsedResponse[0].confirmed,
			recovered: parsedResponse[0].recovered,
			critical: parsedResponse[0].critical,
			deaths: parsedResponse[0].deaths
		});
	}

  render() {
    return (
      <Card className="text-center">
				<Card.Header>
					Covid-19 World Statistics
				</Card.Header>
				<ListGroup>
  				<ListGroup.Item variant="danger">
						<h5>Deaths</h5>
						<hr className="my-1"></hr>
						{this}
					</ListGroup.Item>
  				<ListGroup.Item variant="warning">
						<h5>Confirmed Cases</h5>
						<hr className="my-1"></hr>
						<h6>100000</h6>
					</ListGroup.Item>
					<ListGroup.Item variant="success">
						<h5>Recovered</h5>
						<hr className="my-1"></hr>
						<h6>100000</h6>
					</ListGroup.Item>
				</ListGroup>
      </Card>
        )
    }
}


export default CovidStatsCard;

