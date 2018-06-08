import React, { Component } from 'react';
import * as firebase from 'firebase';

import './Panel.css';
import settings from '../images/settings.png';
import notification from '../images/notification-bell.png';

class Panel extends Component {

  /*<p onClick = {() => {
    logout()
  }}>Logout</p>*/

  render() {
    var user = firebase.auth().currentUser.displayName;
    return (
      <div className="Panel">
        <div className="panel-bar">
          <nav>
            <ul className="panel-menu">
              <li className="panel-active">Dashboard</li>
              <li className="panel-inactive">Cloud Drive</li>
              <li className="panel-inactive endMenu">Profile</li>
              <li><img src={notification} alt="notification" className="notification-icon"/></li>
              <li><img src={settings} alt="settings" className="settings-icon"/></li>
              <li>{user}</li>
            </ul>
          </nav>
        </div>
        {this.props.content}
      </div>
    );
  }
}

export default Panel;
