import React, { Component } from "react";
import { auth } from '../helpers/auth'
import { Link } from 'react-router-dom';

import './Register.css';

function setErrorMsg(error) {
    return {
      registerError: error.message
    }
  }

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      wrongUsername: 0,
      wrongEmail:0,
      wrongPassword: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  registerSuccessfull(){
    if(this.state.wrongEmail === 1 && this.state.wrongUsername === 1 && this.state.wrongPassword === 1){
      return (
      <div className="formBox">
        <p>Register successful. <Link to = "/">Go to login page.</Link></p>
      </div>
      )
    }
  }

  wrongEmailMessage(){
    if(this.state.wrongEmail === 2){
      return (
      <div className="formMessage">
        <p>Email is already taken</p>
      </div>
      )
    }    

  }

  wrongUsernameMessage(){
    if(this.state.wrongUsername === 2){
      return (
        <div className="formMessage">
          <p>Username is already taken</p>
        </div>
      )
    }
  }

  wrongPasswordMessage(){
   if(this.state.wrongPassword === 2){
      return (
        <div className="formMessage">
          <p>Password must have at least 6 characters. </p>
        </div>
      )
    } 
  }

  handleClick(e, role) {
    localStorage.setItem('password', this.password.value);
    localStorage.setItem('user', this.username.value);
    e.preventDefault()
    auth(this.email.value, this.password.value, this.username.value)
      .catch(e => this.setState(setErrorMsg(e)))
      setTimeout(() => {
        localStorage.removeItem('password');
        localStorage.removeItem('user');
    }, 1500);
    }
              
  
  render() {
    return (
      <div className="register-wrapper">
        <div className = "register-content">
          <h1>Register</h1>
          <div className = "register-inputs">
            <div className = "register-right">
              {this.registerSuccessfull()}
              <input type="text" 
              placeholder = "Username"
              ref={(username) => this.username = username}
              />
              <br />
              {this.wrongUsernameMessage()}
              <br/>
              <input type="text" className="form-control" ref={(email) => this.email = email} placeholder="Email"/>            
              <br />
              {this.wrongEmailMessage()}
              <br/>
              <input type="password" className="form-control" placeholder="Password" ref={(password) => this.password = password} />
              <br/>
              {this.wrongPasswordMessage()}
              <br />
              <input
                value="Submit"
                type="submit"
                onClick={event => this.handleClick(event, this.props.role)}
              />       
              <br/>
              <Link to="/login" className="underlineHover">Already have an account ?</Link><br/>
              <span className ="register-line"></span>
            </div>
            <div className = "register-left">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
