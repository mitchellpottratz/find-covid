import React from 'react';

// redux 
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions.js'

// components
import { Navbar, Nav } from 'react-bootstrap';


class NavigationBar extends React.Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
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

export default connect(mapStateToProps, {  })(NavigationBar);