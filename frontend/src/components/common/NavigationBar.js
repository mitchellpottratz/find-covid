import React from 'react';

// redux 
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions.js'

// components
import { Navbar, Nav } from 'react-bootstrap';


class NavigationBar extends React.Component {

  handleLogoutClick = async (e) => {
    console.log('logout clicked');
    await this.props.logoutUser();
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>

          {
            this.props.isLoggedIn ? (
              <Nav.Link onClick={ this.handleLogoutClick }>Logout</Nav.Link>
            ) : (
              <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </React.Fragment>
            )
          }
          
        </Nav>
      </Navbar>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

export default connect(mapStateToProps, { logoutUser })(NavigationBar);