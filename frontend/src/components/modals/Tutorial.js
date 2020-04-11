import React from "react";

export default class Tutorial extends React.Component {
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return <h3>THIS IS THE TUTORTIAL MODAL</h3>;
  }
}
