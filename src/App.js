import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import LoginScreen from "./Loginscreen";
import Register from "./Register.js"
import Login from "./Login.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    };
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );

  }
}

export default App;
