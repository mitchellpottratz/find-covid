import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store';

import './App.css';


class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>

            {/* Registration */}
            <Route path="/register">
              <h1>Register</h1>
            </Route>

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
