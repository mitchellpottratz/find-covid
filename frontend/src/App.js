import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';


class App extends React.Component {

  render() {
    return (
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
    )
  }
}

export default App;
