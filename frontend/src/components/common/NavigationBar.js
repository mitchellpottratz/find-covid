import React from "react";
import Logo from "../../logo.png";

// redux
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userActions.js";

// components
import { Row, Col, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";

class NavigationBar extends React.Component {
  handleLogoutClick = async e => {
    await this.props.logoutUser();
  };

  render() {
    return (
      <Row className="mx-0">
        <Col md={2} sm={2} className="px-0">
          <Image src={Logo} id="nav-logo" thumbnail />
        </Col>

        <Col md={10} sm={10} className="px-0">
					<Navbar>
						<Navbar.Collapse className="justify-content-end">
							<Nav.Link 
								className="btn btn-sm btn-outline-primary mr-2"
								href="/login">
									Sign in
							</Nav.Link>
							<Nav.Link 
								className="btn btn-sm btn-primary"
								href="/register">
								Get Started
							</Nav.Link>
  					</Navbar.Collapse>
					</Navbar>

          <Navbar id="navbar" bg="primary" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/map">Map</Nav.Link>
							<Nav.Link href="/map">About</Nav.Link>
            </Nav>
            <Nav>
              {this.props.isLoggedIn ? (
                <React.Fragment>
                  <NavDropdown title="Account" id="basic-nav-dropdown" drop="">
                    <NavDropdown.Item href="/my-case">My Case</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.handleLogoutClick}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps, { logoutUser })(NavigationBar);
