import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';


const Numbers = {
  a: 'Number1',
  b: 'Number2',
  c: 'Number3',
}

function handleClick(number1) {
  console.log(number1+11);

}

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.state = {number1: ''};
  }
  
  handleChange(e) {
    this.setState({number1: e.target.value});
  }

  handleChange2(f) {
    this.setState({number2: f.target.value});
  }

  handleChange3(n) {
    this.setState({number3: n.target.value});
  }


  render() {
    const number1 = this.state.numbers;
    const number2 = this.state.numbers;
    const number3 = this.state.numbers;
    return (
      <div>
        <fieldset>
          <legend>Enter temperature in Celsius:</legend>
          <input
            value={number1}
            onChange={this.handleChange} />

          <legend>Enter temperature in Celsius:</legend>
          <input
            value={number2}
            onChange={this.handleChange2} />

          <legend>Enter temperature in Celsius:</legend>
          <input
            value={number3}
            onChange={this.handleChange3} />
        </fieldset>
        <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={handleClick}>Halo</button>
      </div>
    );
  }
}


ReactDOM.render(
  <div>
    <App /> 
  </div>,
  document.getElementById('root')
);

export default App;

