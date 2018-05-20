import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions/userActions';

class Panel extends Component {

  render() {
    const username = localStorage.getItem('user')
    const { user, users } = this.props;
    return (
      <div>
        Thanks for logging in {username}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
      user,
      users
  };
}


const connectedPanel = connect(mapStateToProps)(Panel);
export { connectedPanel as Panel };
