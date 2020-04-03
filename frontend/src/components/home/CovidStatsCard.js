import React from 'react';

import { Card } from 'react-bootstrap';


class CovidStatsCard extends React.Component {

  constructor(props) {
		super(props);
		
		this.state = {
			confirmed: '',
			recovered: '',
			critical: '',
			deaths: ''
		}
	}

	componentDidMount() {
		this.getCovidStats();
	}
	
	getCovidStats = async () => {
		const response = await fetch(
			"https://covid-19-data.p.rapidapi.com/totals?format=json", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				"x-rapidapi-key": "4778e9c4d9mshfc64cdfa03ff140p1e6e06jsn8ee30fd8c04a"
			}
		});
		const parsedResponse = await response.json();
		console.log('response:', parsedResponse);
	}

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Covid-19 Stats</Card.Title>

        </Card.Body>
      </Card>
        )
    }
}


export default CovidStatsCard;

