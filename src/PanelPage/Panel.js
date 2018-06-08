import React, { Component } from 'react';
import * as firebase from 'firebase';

<<<<<<< HEAD:src/PanelPage/PanelBars.js
import './PanelBars.scss'
=======
import './Panel.css'
>>>>>>> parent of fbc7da7... panel update:src/PanelPage/Panel.js

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
<<<<<<< HEAD:src/PanelPage/PanelBars.js
        {this.props.content}
=======
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
>>>>>>> parent of fbc7da7... panel update:src/PanelPage/Panel.js
      </div>
    );
  }
}

export default Panel;
