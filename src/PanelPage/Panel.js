import React, { Component } from 'react';
import * as firebase from 'firebase';

import './Panel.css';
import settings from '../images/settings.png';
import notification from '../images/notification-bell.png';
import downArrow from '../images/down-arrow.png'

class Panel extends Component {

  constructor(){
    super()
    this.state = {
      profileTab:false,
      notificationTab:false
    }
    this.showProfileTab = this.showProfileTab.bind(this);
    this.showNotificationTab = this.showNotificationTab.bind(this);
  }

  showProfileTab(){
    this.setState({
      profileTab:true,
    })
    if(this.state.profileTab === true){
      this.setState({
        profileTab:false
      })
    }
    console.log(this.state.profileTab)
  }

  showNotificationTab(){
    this.setState({
      notificationTab:true,
    })
    if(this.state.notificationTab === true){
      this.setState({
        notificationTab:false
      })
    }
  }

  /*<p onClick = {() => {
    logout()
  }}>Logout</p>*/

  render() {
    const showProfileTab = this.state.profileTab;
    var user = firebase.auth().currentUser.displayName;
    return (
      <div className="Panel">
        <div className="panel-bar">
          <nav>
            <ul className="panel-menu">
              <div className="panel-activeTab">
                <li className="panel-active">Dashboard</li>
                <span className="panel-active__span"></span>
              </div>
              <li className="panel-inactive">Cloud Drive</li>
              <li className="panel-inactive">Profile</li>
              <li><img src={notification} alt="notification" className="notification-icon"
              onClick={this.showNotificationTab}/></li>
              <li><img src={settings} alt="settings" className="settings-icon"/></li>
              <li>{user}</li>
              <li><img src={downArrow} alt="downArrow" className="downArrow-icon" 
              onClick={this.showProfileTab}/></li>
            </ul>
            {showProfileTab ? (
                <div className="profileMenu-wrapper">
                </div>
            ) : (
              <div></div>
            )}
          </nav>
        </div>
        {this.props.content}
      </div>
    );
  }
}

export default Panel;
