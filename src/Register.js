import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyCYyiiyITT_sSblgRqYpWKPF2-yUli81l8",
    authDomain: "webapp-0021.firebaseapp.com",
    databaseURL: "https://webapp-0021.firebaseio.com",
    projectId: "webapp-0021",
    storageBucket: "webapp-0021.appspot.com",
    messagingSenderId: "24837464252"
  };

  firebase.initializeApp(config);

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
    
  }

  //1 - Not used username/email
  //2 - used username/email

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

  handleClick(event, role) {
    var apiBaseUrl = "https://webapp-0021.firebaseio.com";

    if(this.state.password.length < 6){
      this.setState({
        wrongPassword:2
      })
    }
    else{
      this.setState({
        wrongPassword:1
      })
    }
    if (
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    ) {
      var payload = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      var email = {
        email: this.state.email,
      };

    firebase.database()
      .ref(`/emails`)
      .once("value")
        .then(snapshot => {
          if(snapshot.hasChild(payload.email)){
            console.log("zły email")
            this.setState({ 
              wrongEmail:2
            });
          } 
          else{
            console.log("dobre email")
            this.setState({ 
              wrongEmail:1
            });
          }
        })
      firebase.database()
        .ref(`/users`)
        .once("value")
          .then(snapshot => {
            if(snapshot.hasChild(payload.username)){
              console.log("zła nazwa")
              this.setState({ 
                wrongUsername:2
              });
            } 
              else if(this.state.wrongEmail === 1 && this.state.wrongPassword === 1){
              axios
              .put(apiBaseUrl + "/users/" + payload.username + ".json", payload)
                .then(function(response) {
                  console.log(response);
                  if(response.data.code === 200){
                    console.log("registration successfull")
                  }
                  else{
                    console.log("some error ocurred", response.data.code);
                  }
                })
                .catch(function(error){
                  console.log(error);
                });
              axios
                .put(apiBaseUrl + "/emails/" + payload.email + ".json", email)
                  .then(function(response) {
                    console.log(response);
                    if (response.data.code === 200) {
                      console.log("registration successfull");
                    } 
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
            }
            else{
              console.log("dobre nazwa")
              this.setState({ 
                wrongUsername:1,
              });
            }
          })
        }}
              
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            {this.registerSuccessfull()}
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            {this.wrongUsernameMessage()}
            <br/>
            <TextField
              hintText="Enter email"             
              floatingLabelText="Enter email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            {this.wrongEmailMessage()}
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br/>
            {this.wrongPasswordMessage()}
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event, this.props.role)}
            />       
            <br/>
            <Link to="/">      
            <RaisedButton
              label="Login"
              primary={true}
              style={style}
            />
            </Link>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15
};

export default Register;
