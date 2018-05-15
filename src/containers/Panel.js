import React, { Component } from 'react';

class Panel extends Component {

  render() {
    return (
      <div>
        Thanks for logging in {this.props.userId}
      </div>
    );
  }
}

export default Panel;
