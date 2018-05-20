import React, { Component } from "react";
import {Helmet} from 'react-helmet';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Register from "./Register.js"
import { Login } from '../LoginPage';
import Main from "../containers/Main.js"
import { Panel } from '../Panel/Panel';


class App extends Component {

  render() {
    return (
      
      <Router>
        <div className="container">
          <Helmet>
			      <title>React App</title>
		      </Helmet>
          <Route exact path="/" component={Main}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/panel" component={Panel} />
        </div>
      </Router>
    );

  }
}

export default App;
