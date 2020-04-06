import React from 'react';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function MapSearchPopover(props) {

	const popover = (
		<Popover id="popover-basic">
    	<Popover.Title as="h3">Searching for a place</Popover.Title>
    	<Popover.Content>
      	<p>
					<strong>
						Do you want to know if someone with COVID-19 has visited your local
						grocery store before you go?
					</strong>
				</p>
				<p>
					Start searching for a place nearby and you will be populated with the best matching 
					businesses according to your search and current location. 
				</p>
				<p>
					Once you find the place you are searching for, click on it, and if there is a red marker, that means
					someone who has been tested positive or someone who has shown symptoms of COVID-19 has visited that business 
					in the last 3 days.
				</p>
				<p>
					You may then click on a marker to view more information about each case of COVID-19.
				</p>
    	</Popover.Content>
  	</Popover>
	)

  return (
		<OverlayTrigger 
			trigger="click"
			placement="right"
			overlay={ popover }>
			<FontAwesomeIcon 
				className="info-icon ml-2"
				icon={ faInfoCircle } />
  	</OverlayTrigger>
	) 
}


export default MapSearchPopover;

