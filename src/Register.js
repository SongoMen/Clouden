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
      showReply: false,
      wrongUsername: false,
      wrongEmail:false
    };
    this.handleClick = this.handleClick.bind(this);
  }


  renderMessage(){
    if(this.state.wrongUsername === true){
      return <div>dsadas</div>
    }
    if(this.state.wrongEmail === true){
      return <div>sdaqwsa</div>
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  handleClick(event, role) {
    var apiBaseUrl = "https://webapp-0021.firebaseio.com";
    // console.log("values in register handler",role);
    //To be done:check for empty values before hitting submit
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
      .ref(`/users`)
      .once("value")
        .then(snapshot => {
          if(snapshot.hasChild(payload.username)){
            console.log("lula")
            this.setState({ 
              showReply: true,
              wrongUsername:true
            });
            console.log(this.state.wrongEmail)
          } 
          else{
            firebase.database()
              .ref('/emails')
              .once('value')
                .then(function(snapshot){
                  if(snapshot.hasChild(payload.email)){
                    console.log("lula")
                    console.log(this.state.wrongEmail)
                  }
                  else{
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
                        } else {
                          console.log("some error ocurred", response.data.code);
                        }
                      })
                    .catch(function(error) {
                      console.log(error);
                    });
                  }
                });
              }
            });
      }}
  
  render() {
    // console.log("props",this.props);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            {this.state.showReply && this.renderMessage()}
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              hintText="Enter email"             
              floatingLabelText="Enter email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
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
