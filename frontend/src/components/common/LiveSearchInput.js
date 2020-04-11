import React from 'react';

import { Form } from 'react-bootstrap';

class LiveSearchInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form.Control 
        type="text"
         />
    )
  }
}

export default LiveSearchInput;



