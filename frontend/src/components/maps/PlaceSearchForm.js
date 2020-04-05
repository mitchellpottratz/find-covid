import React from "react";

import { Form, Row, Col, Card } from "react-bootstrap";
import { MDBListGroup, MDBListGroupItem } from "mdbreact";

class PlaceSearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: "",
      searchPredictions: [],
      isSearching: false,
      isLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ place: e.target.value });

    if (this.state.place.length < 3) {
      this.setState({ isSearching: false });
    } else {
      this.setState({ isSearching: true });
    }

    // maps location must be set so the places autocomplete search so
    // places near the curent map position will be shown
    if (this.mapsLocationIsSet()) {
      this.getAutocompleteResults();
    }
  };

  mapsLocationIsSet = () => {
    if (this.props.mapsCurrentLocation === undefined) {
      return false;
    }
    return true;
  };

  // get the place autocomplete search results from the google places api
  getAutocompleteResults = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          "maps/autocomplete/places?search_input=" +
          this.state.place +
          "&latitude=" +
          this.props.mapsCurrentLocation.lat +
          "&longitude=" +
          this.props.mapsCurrentLocation.lng
      );
      const parsedResponse = await response.json();
      const googleApiResponse = parsedResponse.data;

      if (googleApiResponse.status === "OK") {
        this.setState({ searchPredictions: googleApiResponse.predictions });
      }
    } catch (error) {
      // TODO - handle this error
      console.log("error occurred while searching for places:", error);
    }
  };

  // when a place from the search results drop down is clicked
  handleSearchPredictionClick = async (place) => {
    this.setState({
      place: place.description,
      isSearching: false,
    });

    // makes request to get the latitude and longitude of the place
    const googlePlaceId = place.place_id;
    const response = await fetch(
      process.env.REACT_APP_API_URL +
        "maps/places/location?google_place_id=" +
        googlePlaceId
    );
    const parsedResponse = await response.json();

    // changes the position of the map to whatever place was searched
    this.props.setMapsLocation(parsedResponse.data.result.geometry.location);
  };

  hideSearchPredictionsBox = () => {
    // delayed by 2 milliseconds because when the user clicks on a place from the dropdown
    // they leave the search input which hides the search results an it doesnt allow to set
    // the places the user clicked on in the state without this delay
    setTimeout(() => {
      this.setState({ isSearching: false });
    }, 200);
  };

  render() {
    return (
      <Form>
        <Row>
          <Col md={8} sm={12}>
            <Card>
              <Card.Body>
                <Form.Label>Search for a place nearby</Form.Label>
                <Form.Control
                  className="mb-2 pb-0"
                  type="text"
                  placeholder="Start typing..."
                  name="place"
                  value={this.state.place}
                  onChange={this.handleChange}
                  onBlur={this.hideSearchPredictionsBox}
                />

                {/* show the dropdown box to get places autocomplete predictions if the user 
									is current searching */}
                {this.state.isSearching ? (
                  <MDBListGroup className="dropdown-search-box">
                    <MDBListGroupItem className="text-center">
                      <strong>Please select a place below</strong>
                    </MDBListGroupItem>
                    {this.state.searchPredictions.map((place, i) => {
                      return (
                        <MDBListGroupItem
                          key={i}
                          className="dropdown-search-item"
                          onClick={() =>
                            this.handleSearchPredictionClick(place)
                          }
                        >
                          {place.description}
                        </MDBListGroupItem>
                      );
                    })}
                  </MDBListGroup>
                ) : null}
                <a
                  href="#"
                  className="ml-1"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ place: "", searchPredictions: [] });
                  }}
                >
                  Clear
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    );
  }
}

export default PlaceSearchForm;
