import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';


class Panel extends Component {

  
  render() {
    var user = firebase.auth().currentUser;
    var name, email, uid, username;
    firebase.database().ref('/users/' + user.uid + '/info').once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username)
    })
    
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    console.log(name, email, uid, username)
    return (
      <div>
        <p onClick = {() => {
          logout()
        }}>Logout</p>
        Thanks for logging in lul 
      </div>
    );
  }
}

export default Panel;
