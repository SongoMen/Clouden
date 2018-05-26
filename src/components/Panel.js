import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';


class Panel extends Component {

  
  render() {
    var user = firebase.auth().currentUser.displayName;
    return (
      <div>
        <p onClick = {() => {
          logout()
        }}>Logout</p>
        <h1>Hello {user}</h1>
      </div>
    );
  }
}

export default Panel;
