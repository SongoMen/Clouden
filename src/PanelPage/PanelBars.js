import React, { Component } from 'react';
import * as firebase from 'firebase';

import './PanelBars.scss'

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
        {this.props.content}
      </div>
    );
  }
}

export default PanelBars;
