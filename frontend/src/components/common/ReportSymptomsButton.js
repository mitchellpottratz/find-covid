import React from 'react';

import { Button } from 'react-bootstrap';


class ReportSymptomsButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    // shows the button that allows them to report a case if the 
    // user does not already  have one reported
    if (this.props.userHasCase) {
      return (
        null
      )    

    // doesnts show the button if the user already has a case reported 
    } else {
      return (
        <Button
				  variant="light"
					onClick={ this.props.showModal }>
					Report Symptoms
				</Button>
      )
    }
    
  }
}


export default ReportSymptomsButton;

