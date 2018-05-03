import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as firebase from "firebase";

var login = {
	validUsername:false,
	validPassword:false,
	isLogged:false
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogged:false
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
            console.log("dobry username")
            login.validUsername = true
        	} 
          else{
            console.log("zły username lub hasło")
            login.validUsername = false
          }
        })
    firebase.database()
    	.ref('/users/' + payload.username + '/password')
      	.once("value", function(snapshot){
      		if(snapshot.val() === payload.password){
      			console.log("dobre hasło")
      			login.validPassword = true
      		}
      		else{
     			console.log("złe hasło")
     			login.validUsername = false
      		}
    	})
    if(login.validUsername === true &&
       login.validPassword === true){
    	login.isLogged = true
    	console.log("dsadsa")
    }
  	}
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
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
