import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

const scaleNames = {
  a: 'Number1',
  b: 'Number2',
  c: 'Number3',
  d: "result"
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {a: ''};
    this.state = {b: ''};
    this.state = {c: ''};
    this.state = {d: ''};
  }

  handleChange(e) {
    this.setState({a: e.target.value});
    this.setState({b: e.target.value});
    this.setState({c: e.target.value});
    this.setState({d: e.target.value});
  }

  render() {
    const a = this.state.temperature;
    const b = this.state.temperature;
    const c = this.state.temperature;
    const d = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter a:</legend>
        <input
          value={a}
          onTemperatureChange={this.handleCelsiusChange} />

        <legend>Enter b:</legend>
        <input
          value={b}
          onChange={this.handleChange} />
        <legend>Enter c:</legend>
        <input
          value={c}
          onChange={this.handleChange} />
        <legend>Enter d:</legend>
        <input
          value={d}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);


export default Calculator;
