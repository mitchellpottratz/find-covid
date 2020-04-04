import React from 'react';

import { Card, ListGroup, Spinner } from 'react-bootstrap';


class CovidStatsCard extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			confirmed: '',
			recovered: '',
			critical: '',
			deaths: '',
			countryData: [],
			worldDataIsLoading: true,
			countryDataIsLoading: true
		}
	}

	componentDidMount() {
		this.getWorldCovidStats();
		// this.getCountryCovidStats();
	}
	
	// gets worldwide stats on death, confirmed cases, recovered and critical
	getWorldCovidStats = async () => {
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
			deaths: parsedResponse[0].deaths,
			worldDataIsLoading: false
		});
	}

	// gets stats for each country
	getCountryCovidStats = async () => {
		const response = await fetch(
			"https://covid-19-data.p.rapidapi.com/country/all?format=undefined", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_XRAPID_API_KEY
			}	
		});
		const parsedResponse = await response.json();
		console.log('response:', parsedResponse);
		this.setState({
			countryData: parsedResponse,
			countryDataIsLoading: false
		});
	}

  render() {
    return (
			<Card id="covid-stats-card">
				<Card.Body>
					<Card.Title className="text-center">Covid-19 World Statistics</Card.Title>
					<hr></hr>
					<div className="text-center mt-4">
						<div className="text-danger">
							<h5>Total Deaths</h5>
							<hr className="mt-0 mb-2 w-75"></hr>
							<h5>{ this.state.deaths }</h5>
						</div>
						<div className="text-warning mt-4">
							<h5>Confirmed Cases</h5>
							<hr className="mt-0 mb-2 w-75"></hr>
							<h5>{ this.state.confirmed }</h5>
						</div>
						<div className="text-success mt-4">
							<h5>Recovered</h5>
							<hr className="mt-0 mb-2 w-75"></hr>
							<h5>{ this.state.recovered }</h5>
						</div>
					</div>
				</Card.Body>
      </Card>
        )
    }
}


export default CovidStatsCard;

