import React from "react";

import { Form, ListGroup } from "react-bootstrap";

class LiveSearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: this.props.inputValue,
      searchPredictions: this.props.searchPredictions,
      isSearching: false
    }
  }

  handleChange = (e) => {
    this.props.handleChange(e.target.value);

    // shows the search predictions if there is atleast 2 characters typed
    if (this.props.inputValue.length > 1) {
      this.props.getSearchPredictionResults();
      this.showSearchPredictionsBox();
    } else {
      this.hideSearchPredictionsBox();
    }
  }


  hideSearchPredictionsBox = () => {
    setTimeout(() => {
      this.setState({ isSearching: false });
    }, 200);
  }

  showSearchPredictionsBox = () => {
    this.setState({ isSearching: true });
  }

  render() {
    return (
      <div id="live-search-container">
        <Form.Label> { this.props.label } </Form.Label>
        <Form.Control 
          type="text" 
          placeholder={ this.props.placeholder } 
          value={ this.props.inputValue }
          onChange={ this.handleChange } 
          onBlur={ this.hideSearchPredictionsBox } />

        {this.state.isSearching ? (
          <ListGroup 
            id="live-search-box"
            variant="flush">
            {this.props.searchPredictions.map((prediction, i) => {
              return (
                <ListGroup.Item 
                  key={i}
                  action
                  onClick={ () => this.props.handleSearchPredictionClick(prediction) }>
                  { prediction.description }
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
