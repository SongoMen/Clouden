import React, {Component} from "react";
import {Link} from "react-router-dom";
import {firebaseAuth} from "../helpers/auth";

import "./Main.css";

class Main extends Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="main">
        <div className="banner">
          <nav>
            <ul>
              {this.state.authed === true ? (
                <li>
                  <Link to="/login" className="login2">
                    <h4>MY ACCOUNT</h4>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="login2">
                    <h4>SIGN IN</h4>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/register" class="register2">
                  <h4>Create account</h4>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="heading">
            <h1>Meet Clouden</h1>
            <span className="heading-uderline"></span>
            <p>
              Cloud built for the future with <br />
              comfortable dashboard and best security.
            </p>
            <div className="heading-buttons">
              <Link to="/login">
                <div className="login1">
                  <h4>explore the features</h4>
                </div>
              </Link>
              <Link to="/register">
                <div className="register1">
                  <h4>click here to register</h4>
                </div>
              </Link>
            </div>
          </div>
          <div className="banner-image"></div>
          <div className="banner-cover"></div>
        </div>
      </div>
    );
  }
}
export default Main;
