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
      <Navbar id="navbar" bg="primary" variant="dark">
        <Navbar.Brand>
          <Nav.Link href="/home">
            <Image src={Logo} id="nav-logo"  />
          </Nav.Link>
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/home">About</Nav.Link>
        </Nav>

        <Nav>
          {this.props.isLoggedIn ? (
            <React.Fragment>
              <NavDropdown title="Account" id="basic-nav-dropdown" drop="down">
                <NavDropdown.Item href="/my-case">My Case</NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleLogoutClick}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Nav.Link href="/login">Login</Nav.Link> */}
              <Nav.Link href="/login">Sign In</Nav.Link>
              {/* <Nav.Link href="/register">Register</Nav.Link> */}
              <Nav.Link href="/register">Get Started</Nav.Link>
            </React.Fragment>
          )}
        </Nav>

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
