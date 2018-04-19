import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link
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
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} key={3} />);
    this.setState({
      loginPage: loginPage
    });
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/" component={LoginScreen} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );

  }
}

export default App;
