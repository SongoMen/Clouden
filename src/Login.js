import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as firebase from "firebase";
import { Link } from 'react-router-dom';

import './Login.css'

var login = {
	validUsername:0,
	validPassword:0,
	isLogged:false
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleClick(event) {

    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    firebase.database()
      	.ref(`/users`)
      	.once("value")
        .then(snapshot => {
          if(snapshot.hasChild(payload.username)){
            login.validUsername = 1
        	} 
          else{
            login.validUsername = 2
          }
        })
    firebase.database()
    	.ref('/users/' + payload.username + '/password')
      	.once("value", function(snapshot){
      		if(snapshot.val() === payload.password){
      			login.validPassword = 1
      		}
      		else {
     			login.validUsername = 2
      		}
    	})
    if(login.validUsername === 1 &&
       login.validPassword === 1){
    	login.isLogged = true
    	console.log("is Logged " + login.isLogged)
    }
    console.log("Username " + login.validUsername)	
    console.log("Password " + login.validPassword)

  	}
  render() {
    return (
      <div className="loginScreen">
		<nav>
			<ul>
				<li className="float">
					<p>Home</p>
				</li>
				<li className="float">
					<p>About Us</p>
				</li>
				<li className="float">
					<p>Features</p>
				</li>
				<li className="float">
					<p>Pricing</p>
				</li>
				<Link to = "/login">
					<li>
						<div className="login2">
							<h1>Login</h1>
						</div>
					</li>
				</Link>	
				<Link to = "/register">					
					<li>
						<div className="register">
							<h1>Create account</h1>
						</div>
					</li>
				</Link>
			</ul>
		</nav>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Login;
