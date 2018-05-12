import React, { Component } from "react";
import {Helmet} from 'react-helmet';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Register from "./Register.js"
import Login from "./Login.js"
import Main from "./Main.js"


class App extends Component {

  render() {
    return (
      
      <Router>
        <div className="container">
          <Helmet>
			      <title>React App</title>
		      </Helmet>
          <Route exact path="/" component={Main} title="lula"/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );

  }
}

export default App;
