import React from "react";

import { Form, ListGroup } from "react-bootstrap";

class LiveSearchInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="live-search-container">
        <Form.Label> {this.props.label} </Form.Label>
        <Form.Control type="text" placeholder={this.props.placeholder} />
        <ListGroup 
          id="live-search-box"
          variant="flush">
          <ListGroup.Item action> Cras justo odio </ListGroup.Item>
          <ListGroup.Item action> Dapibus ac facilisis in </ListGroup.Item>
          <ListGroup.Item> Morbi leo risus </ListGroup.Item>
          <ListGroup.Item> Porta ac consectetur ac </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default LiveSearchInput;
