import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';

import './Panel.css'

class Panel extends Component {

  /*<p onClick = {() => {
    logout()
  }}>Logout</p>*/

  render() {
    var user = firebase.auth().currentUser.displayName;
    return (
      <div className="Panel">
        <div className="panel-bar">
        <h2 className="panel-title">Dashboard</h2>
        </div>
        <aside className="panel-leftbar">
          <h4 className="user">Hello {user}</h4>
        </aside>
        <div className="panel-sections">
          <div className="panel-sections__disk">
              <h1>2.3/5 GB</h1>
          </div>
          <div className="panel-sections__account">
              <h1>2.3/5 GB</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
