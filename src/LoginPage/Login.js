import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import './Login.css';
import { login, resetPassword } from '../helpers/auth'

function setErrorMsg(error) {
	return {
	  loginMessage: error
	}
  }

class Login extends Component {
  constructor(props) {
	super(props);
    this.state = {
		username: "",
		password: "",
		clicked:0,
		classCircle:"",
		classTick:"checkmark draw",
		classTick2:"checkmark2 draw",
		classText:"",
		classBg:"",
		authClass:"",
		authText:""
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);
  }
  state = { loginMessage: null }
	getStyleUsername(){
		if(this.state.username.length <= 0 &&
		this.state.clicked !== 0 )
		{
			return {
				border: '2px solid red '
			}
		}
	}
	getStylePassword(){
		if(this.state.password.length <= 0 &&
		this.state.clicked !== 0){
			return {
				border: '2px solid red '
			}
		}
	}

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

  	handleClick(e) {
			this.setState({
				classCircle:"circle-loader",
				authClass:"authContent ",
				classText:"authText ",
				classBg:"auth-bg ",
				authText:"Authenticating...",
				clicked: this.state.clicked + 1
			})
			e.preventDefault()
				login(this.email.value, this.password.value)
					.catch((error) => {
						setTimeout(() => {
							this.setState({
								classCircle:"circle-loader load-complete red ",
								classTick2:"checkmark2 draw show",
								authText:"Wrong username or pasword",
								clicked: this.state.clicked + 1
							})
						}, 2000);
						setTimeout(() => {
							this.setState({
								classCircle:"",
								classTick:"",
								classTick2:"",
								classText:"",
								classBg:"",
								authClass:"",
								authText:""
							})
						}, 3500);
					})
			}

	resetPassword = () => {
		resetPassword(this.email.value)
		  .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
		  .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
	}

	auth(){
	  	return(
		  	<div className="auth">
			  	<div className = {this.state.authClass}>
					<div className={this.state.classCircle} >
						<div className={this.state.classTick}></div>
						<div className={this.state.classTick2}></div>
					</div>
					<h3 className={this.state.classText} >{this.state.authText}</h3>	  		
				</div>
				<div className={this.state.classBg}></div>
		  	</div>
	  	)
  	}

  render() {
    return (
		<div className="loginScreen">
			<Helmet>
				<title>React App - Login</title>
			</Helmet>
			{this.auth()}
			{this.state.loginMessage}
			<div className="wrapper fadeInDown">
				<div className="loginContent">
					<div className= "infoContent">			
					</div>
						<div className="formContent-text" >
							<div className="login-tabs fadeIn first">
								<h4 className="active"> Sign In </h4>
								<span className="login-line"></span>
								<h4 className="inactive underlineHover"> Sign Up </h4>
							</div>
							<div className="fadeIn first">
							</div>
							<label className= "fadeIn first">Email</label>
							<br/>
							<input 
								type="text" 
								id="login" 
								className="fadeIn second" 
								name="Email" 
								placeholder="Type your email here" 
								style = {this.getStyleUsername()}
								ref={(email) => this.email = email}
							/>
							<br/>
							<label className="fadeIn first">Password</label>
							<br/>
							<input 
								type="password" 
								id="password" 
								className="fadeIn third" 
								name="password" 
								style = {this.getStylePassword()}
								placeholder="Type password here" 
								ref={(password) => this.password = password}
							/>
							<br/>
							<input type="submit" className="fadeIn fourth" value="Log In" onClick={event => this.handleClick(event)}/>
						</div>
				</div>
			</div>
    	</div>
    );
  }
}
export default Login;
