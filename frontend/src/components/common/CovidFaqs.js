import React from 'react';

import { Accordion, Card, Button } from 'react-bootstrap';


function CovidFaqs(props) {
  return (
		<Accordion>

			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="0">
						What is a novel coronavirus?
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
      		<Card.Body>
						<p>
							A novel coronavirus is a new coronavirus that has not been previously identified.
							The virus causing coronavirus disease 2019 (COVID-19), is not the same as the
							coronaviruses that commonly circulate among humans and cause mild illness, like
							the common cold.
						</p>
						<p>
							A diagnosis with coronavirus 229E, NL63, OC43, or HKU1 is not the same as a COVID-19
							diagnosis. Patients with COVID-19 will be evaluated and cared for differently than
							patients with common coronavirus diagnosis.
						</p>
					</Card.Body>
    		</Accordion.Collapse>
			</Card>

			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="1">
						How does the virus spread?
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						<p>
						  This virus was first detected in Wuhan City, Hubei Province, China. The first infections 
							were linked to a live animal market, but the virus is now spreading from person-to-person. 
							It’s important to note that person-to-person spread can happen on a continuum. Some viruses 
							are highly contagious (like measles), while other viruses are less so.
						</p>
						<p>
							The virus that causes COVID-19 seems to be spreading easily and sustainably in the community 
							(“community spread”) in some affected geographic areas.Community spread means people have 
							been infected with the virus in an area, including some who are not sure how or where they became infected.
						</p>
					</Card.Body>
				</Accordion.Collapse>
			</Card>

			<Card>
    		<Card.Header>
      		<Accordion.Toggle as={Button} variant="link" eventKey="2">
						What are they symptoms of COVID-19?
      		</Accordion.Toggle>
    		</Card.Header>
    		<Accordion.Collapse eventKey="2">
      		<Card.Body>
						<p>
							Reported illnesses have ranged from mild symptoms to severe illness and death for confirmed 
							coronavirus disease 2019 (COVID-19) cases.
						</p>
						<p>
							These symptoms may appear <strong>2-14 days after exposure</strong> (based on the incubation
						  period of MERS-CoV viruses).
						</p>
						<ul>
							<li>Fever</li>
							<li>Cough</li>
							<li>Shortness of Breath</li>
						</ul>
					</Card.Body>
    		</Accordion.Collapse>

				<Card.Footer className="text-center">
			    <small> 
						<span className="mb-2">
							All information is from the Centers for Disease Control and Prevention
						</span><br></br>
				    <a 
						  href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html#anchor_1584389201096" 
						  target="_blank">
					    Learn More 
					  </a>
					</small>
				</Card.Footer>
  		</Card>

		</Accordion>
  )
}


export default CovidFaqs;
