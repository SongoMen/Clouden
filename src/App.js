import React, { Component } from "react";

import LoginScreen from "./Loginscreen";
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
    return <div key={1} className="App">{this.state.loginPage}</div>;
  }
}

export default App;
