import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';


class Panel extends Component {

  
  render() {
    var user = firebase.auth().currentUser;
    var username;
    firebase.database().ref().child('users/' + user.uid + '/info/username')
    .once('value',function(snapshot) {  
      var username = JSON.stringify(snapshot.val())
    })
    setTimeout(() => {
      console.log(username,user.displayName)
    }, 1500);
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
