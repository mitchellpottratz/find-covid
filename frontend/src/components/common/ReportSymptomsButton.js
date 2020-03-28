import React from 'react';

import { Button } from 'react-bootstrap';


class ReportSymptomsButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.userHasCase) {
      return (
        <Button
				  variant="light"
					onClick={ this.props.showModal }>
					Report Symptoms
				</Button>
      )
    } else {
      return (
        null
      )
    }
    
  }
}


export default ReportSymptomsButton;

