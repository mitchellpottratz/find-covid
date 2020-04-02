import React from 'react';

// libraries
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store';

// custom components
import NavigationBar from './components/common/NavigationBar.js';
import HomeContainer from './components/home/HomeContainer.js';
import Register from './components/authentication/Register.js';
import Login from './components/authentication/Login.js';
import ConfirmPhoneNumber from './components/authentication/ConfirmPhoneNumber.js';
import MapContainer from './components/maps/MapContainer.js';
import MyCase from './components/user/MyCase.js';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';


class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <NavigationBar />
        <BrowserRouter>
          <Switch>

            {/* Registration */}
            <Route 
              path="/register"
              component={ Register } />

            {/* Login */}
            <Route 
              path="/login" 
              component={ Login } />

            {/* Confirm Phone Number */}
            <Route 
              path="/confirm-number"
              component={ ConfirmPhoneNumber } />

            {/* Map */}
            <Route 
              path="/map"  
              component={ MapContainer } />

            {/* Show Users Case */}
            <Route
              path="/my-case"
              component={ MyCase } />

            {/* Home */}
            <Route 
              path="/"
              component={ HomeContainer } />

          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
