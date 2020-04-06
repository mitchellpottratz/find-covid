import React from 'react';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function MapSearchPopover(props) {

	const popover = (
		<Popover id="popover-basic">
    	<Popover.Title as="h3">Popover right</Popover.Title>
    	<Popover.Content>
      	And here's some <strong>amazing</strong> content. It's very engaging.
      	right?
    	</Popover.Content>
  	</Popover>
	)

  return (
		<OverlayTrigger trigger="click" placement="right" overlay={ popover }>
    	<FontAwesomeIcon className="text-primary" icon={ faInfoCircle } />
  	</OverlayTrigger>
	) 
}


export default MapSearchPopover;

