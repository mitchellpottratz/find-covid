import React from "react";

import { Form, ListGroup } from "react-bootstrap";

class LiveSearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      isSearching: false,
      searchPredictions: ['prediction 1', 'prediction 2']
    }
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });

    // shows the search predictions if there is atleast 2 characters typed
    if (this.state.searchInput.length > 1) {
      this.showSearchPredictionsBox();
    } else {
      this.hideSearchPredictionsBox();
    }
  }

  handleSearchPredictionClick = (prediction) => {
    console.log('prediction clicked:', prediction);
    this.hideSearchPredictionsBox();
  }

  hideSearchPredictionsBox = () => {
    this.setState({ isSearching: false });
  }

  showSearchPredictionsBox = () => {
    this.setState({ isSearching: true });
  }

  render() {
    return (
      <div id="live-search-container">
        <Form.Label> {this.props.label} </Form.Label>
        <Form.Control 
          type="text" 
          placeholder={this.props.placeholder} 
          value={ this.state.searchInput }
          onChange={ this.handleChange } />

        {this.state.isSearching ? (
          <ListGroup 
            id="live-search-box"
            variant="flush">
            {this.state.searchPredictions.map((prediction, i) => {
              return (
                <ListGroup.Item 
                  key={i}
                  action
                  onClick={ () => this.handleSearchPredictionClick(prediction) }
                  >
                  prediction
                </ListGroup.Item>
              )
            })}
          </ListGroup>  
        ) : (
          null
        )}
      </div>
    );
  }
}

export default LiveSearchInput;
