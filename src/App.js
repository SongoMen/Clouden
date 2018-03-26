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

function toNumber1(Number2) {
  return (Number2 - 32) * 5 / 9;
}

function toNumber2(Number1) {
  return (Number1 * 9 / 5) + 32;
}

function toResult(Number1,Number2,Number3) {
  return (Number2 * Number2)-(4 * Number1 * Number3);
}

function tryConvert(number, convert) {
  const input = parseFloat(number);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function delta(Number1, Number2, Number3) {
  return ((Number2*Number1)-(4*Number1*Number3));
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const number = this.props.number;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={number}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumber1Change = this.handleNumber1Change.bind(this);
    this.handleNumber2Change = this.handleNumber2Change.bind(this);
    this.handleNumber4Change = this.handleNumber2Change.bind(this);
    this.state = {number: '', scale: 'c'};
  }

  handleNumber1Change(number) {
    this.setState({scale: 'c', number});
  }

  handleNumber2Change(number) {
    this.setState({scale: 'f', number});
  }
  handleNumber4Change(number) {
    this.setState({scale: 'd', number});
  }
  
  render() {
    const scale = this.state.scale;
    const number = this.state.number;
    const Number1 = scale === 'a' ? tryConvert(number, toNumber1) : number;
    const Number2 = scale === 'b' ? tryConvert(number, toNumber2) : number;
    const Number3 = scale === 'c' ? tryConvert(number, toNumber2) : number;
    const result = scale === 'd' ? tryConvert(number, toResult) : number;


    return (
      <div>
        <TemperatureInput
          scale="a"
          number={Number1}
          onTemperatureChange={this.handleNumber1Change} />
        <TemperatureInput
          scale="b"
          number={Number2}
          value={this.state.inputValue} />
        <TemperatureInput
          scale="c"
          number={Number3}
          onTemperatureChange={this.handleNumber3Change} />
        <TemperatureInput
          scale="d"
          number={result}
          onTemperatureChange={this.handleNumber4Change} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);


export default Calculator;
