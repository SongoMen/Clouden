import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import * as firebase from 'firebase';

import './PanelBars.css'

class PanelBars extends Component {

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
        {this.props.content}
      </div>
    );
  }
}

export default PanelBars;
