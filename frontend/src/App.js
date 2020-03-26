import React from 'react';

// libraries
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store';

// custom components
import Register from './components/authentication/Register.js';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>

            {/* Registration */}
            <Route 
              path="/register"
              component={ Register } />

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
