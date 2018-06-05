import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';

import './Panel.css'

class Panel extends Component {

  
  render() {
    var user = firebase.auth().currentUser.displayName;
    return (
      <div className="Panel">
        <div className="panel-bar">
          <p onClick = {() => {
            logout()
          }}>Logout</p>
          <h3>Hello {user}</h3>
        </div>
        <aside className="panel-leftbar">
        
        </aside>
      </div>
    );
  }
}

export default Panel;
