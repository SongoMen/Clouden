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
		validUsername:0,
		validPassword:0,
		clicked:0,
		classCircle:"circle-loader",
		classTick:"checkmark draw",
		classTick2:"checkmark2 draw",
		classText:"authText",
		classBg:"auth-bg",
		authClass:"authContent",
		authText:"Authenticating...",
		submitted: false
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
		e.preventDefault()
		login(this.email.value, this.pw.value)
		  .catch((error) => {
			  this.setState(setErrorMsg('Invalid username/password.'))
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
			<nav>
				<ul>
					<li className="float">
						<p>Home</p>
					</li>
					<li className="float">
						<p>About Us</p>
					</li>
					<li className="float">
						<p>Features</p>
					</li>
					<li className="float">
						<p>Pricing</p>
					</li>
					<Link to = "/login">
						<li>
							<div className="login2">
								<h1>Login</h1>
							</div>
						</li>
					</Link>	
					<Link to = "/register">					
						<li>
							<div className="register">
								<h1>Create account</h1>
							</div>
						</li>
					</Link>
				</ul>
			</nav>
			{this.auth()}
			{this.state.loginMessage}
			<div className="wrapper fadeInDown">
				<div id="formContent">
					<h2 className="active"> Sign In </h2>
					<div className="fadeIn first">
						<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
					</div>
					<input 
						type="text" 
						id="login" 
						className="fadeIn second" 
						name="Email" 
						placeholder="Email" 
						style = {this.getStyleUsername()}
						ref={(email) => this.email = email}
					/>
					<input 
						type="password" 
						id="password" 
						className="fadeIn third" 
						name="password" 
						style = {this.getStylePassword()}
						placeholder="Password" 
						ref={(password) => this.password = password}
					/>
					<input type="submit" className="fadeIn fourth" value="Log In" onClick={event => this.handleClick(event)}/>
					<div id="formFooter">
						<Link to="/register" className="underlineHover">Don't have account ?</Link><br/>
						<Link to="#" className="underlineHover" onClick={this.resetPassword}>Forgot Password?</Link>
					</div>
				</div>
			</div>
    	</div>
    );
  }
}
export default Login;
