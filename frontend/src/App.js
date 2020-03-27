import React from 'react';

// libraries
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store';

// custom components
import NavigationBar from './components/common/NavigationBar.js';
import Register from './components/authentication/Register.js';
import Login from './components/authentication/Login.js';
import ConfirmPhoneNumber from './components/authentication/ConfirmPhoneNumber.js';
import MapContainer from './components/maps/MapContainer.js';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
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

            {/* Home */}
            <Route path="/">
              <h1>Home</h1>
            </Route>

          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
