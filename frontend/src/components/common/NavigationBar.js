import React from "react";
import Logo from "../../logo.png";

// redux
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userActions.js";

// components
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap";

class NavigationBar extends React.Component {
  handleLogoutClick = async e => {
    await this.props.logoutUser();
  };

  render() {
    return (
      <Navbar 
        id="navbar"
        bg="primary" 
        expand="md" 
        sticky="top" 
        collapseOnSelect>
        <Navbar.Brand>
          <Nav.Link href="/home">
            <Image src={Logo} id="nav-logo" alt="Sympto Map Logo" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/map">Map</Nav.Link>
            <Nav.Link href="/home">About</Nav.Link>
          </Nav>
          <Nav>
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <NavDropdown title="Account" drop="down">
                  <NavDropdown.Item href="/my-case">My Case</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleLogoutClick}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/login">Sign In</Nav.Link>
                <Nav.Link href="/register">Get Started</Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>  
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps, { logoutUser })(NavigationBar);
