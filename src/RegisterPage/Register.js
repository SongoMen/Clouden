import React, {Component} from "react";
import {auth, loginWithGoogle} from "../helpers/auth";
import {Link} from "react-router-dom";
import GoogleButton from "react-google-button";

import "./Register.css";

const firebaseAuthKey = "firebaseAuthInProgress";

function setErrorMsg(error) {
  return {
    registerError: error.message,
  };
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      wrongUsername: 0,
      wrongEmail: 0,
      wrongPassword: 0,
    };
    this.handleClickRegisterUser = this.handleClickRegisterUser.bind(this);
  }

  registerSuccessfull() {
    if (
      this.state.wrongEmail === 1 &&
      this.state.wrongUsername === 1 &&
      this.state.wrongPassword === 1
    ) {
      return (
        <div classNameName="formBox">
          <p>
            Register successful. <Link to="/">Go to login page.</Link>
          </p>
        </div>
      );
    }
  }

  wrongEmailMessage() {
    if (this.state.wrongEmail === 2) {
      return (
        <div classNameName="formMessage">
          <p>Email is already taken</p>
        </div>
      );
    }
  }

  wrongUsernameMessage() {
    if (this.state.wrongUsername === 2) {
      return (
        <div classNameName="formMessage">
          <p>Username is already taken</p>
        </div>
      );
    }
  }

  wrongPasswordMessage() {
    if (this.state.wrongPassword === 2) {
      return (
        <div classNameName="formMessage">
          <p>Password must have at least 6 characters. </p>
        </div>
      );
    }
  }

  handleGoogleLogin() {
    loginWithGoogle().catch(function(error) {
      alert(error); // or show toast
      localStorage.removeItem(firebaseAuthKey);
    });
    localStorage.setItem(firebaseAuthKey, "1");
  }
  handleClickRegisterUser(e) {
    var re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      this.password.value.length > 6 &&
      re.test(String(this.email.value).toLowerCase())
    ) {
      localStorage.setItem("password", this.password.value);
      localStorage.setItem("user", this.username.value);
      auth(
        this.email.value,
        this.password.value,
        this.username.value,
      ).catch(e => this.setState(setErrorMsg(e)));
      setTimeout(() => {
        localStorage.removeItem("password");
        localStorage.removeItem("user");
      }, 1500);
    }
    if (this.password.value.length < 6) {
      alert("Password must have at least 6 characters");
    }
    if (re.test(String(this.email.value).toLowerCase()) === false) {
      alert("wrong email adress");
    }
  }

  render() {
    return (
      <div className="register-wrapper">
        <div className="grid">
          <form
            action="https://httpbin.org/post"
            method="POST"
            className="form login">
            <div className="form__field">
              <label>
                <svg className="icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#user"></use>
                </svg>
                <span className="hidden">Username</span>
              </label>
              <input
                id="login__username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                required
                ref={username => (this.username = username)}
              />
            </div>

            <div className="form__field">
              <label>
                <svg className="icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#email"></use>
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__email"
                type="text"
                name="email"
                className="form__input"
                placeholder="Email"
                required
                ref={email => (this.email = email)}
              />
            </div>

            <div className="form__field">
              <label>
                <svg className="icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#lock"></use>
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__password"
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
                required
                ref={password => (this.password = password)}
              />
            </div>

            <div className="form__field">
              <input
                type="submit"
                value="Sign Up"
                onClick={event =>
                  this.handleClickRegisterUser(event, this.props.role)
                }
              />
            </div>
            <h1>OR</h1>
            <GoogleButton
              style={{margin: "0 auto"}}
              label="Sign up with Google"
              type="light"
            />
          </form>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="icons">
          <symbol id="lock" viewBox="0 0 1792 1792">
            <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
          </symbol>
          <symbol id="user" viewBox="0 0 1792 1792">
            <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
          </symbol>
          <symbol id="email">
            <path d="M18,5H6A3,3,0,0,0,3,8v8a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V8A3,3,0,0,0,18,5ZM6,6H18a2.0023,2.0023,0,0,1,2,2v.19873l-8,4.23535L4,8.19873V8A2.0023,2.0023,0,0,1,6,6ZM18,18H6a2.0023,2.0023,0,0,1-2-2V9.33069l7.76562,4.1112a.50173.50173,0,0,0,.46876,0L20,9.33069V16A2.0023,2.0023,0,0,1,18,18Z" />
          </symbol>
        </svg>

        <div className="banner-image" style={{marginLeft: 0}}></div>
        <div className="banner-cover"></div>
      </div>
    );
  }
}

export default Register;
