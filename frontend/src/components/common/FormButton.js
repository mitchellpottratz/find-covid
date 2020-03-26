import React from 'react';

import { Button, Spinner } from 'react-bootstrap';


class FormButton extends React.Component {

  render() {

    // shows no loading icon on the button
    if (!this.props.isLoading) {
      return (
        <Button variant={ this.props.variant } type="submit">
          { this.props.text }
        </Button>
      )
    
    // shows a loading icon on the button
    } else {
      return (
        <Button variant={ this.props.variant }>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
          <span className="ml-2">Loading</span>
        </Button>
      )
    }
  }
}


export default FormButton;


