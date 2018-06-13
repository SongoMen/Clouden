import React, { Component } from "react";
import {Helmet} from 'react-helmet';

import './Login.css';
import { login, auth } from '../helpers/auth'

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
		showRegister:false,
		showLogin:true,
		classCircle:"",
		classTick:"checkmark draw",
		classTick2:"checkmark2 draw",
		classText:"",
		classBg:"",
		authClass:"",
		authText:"",
		Classtab:"active",
		Classtab2:"inactive underlineHover"
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);
  }
  state = { loginMessage: null }

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

		handleClickRegisterUser(e) {
			e.preventDefault()
			if(this.password.value > 0 && this.username.value > 0){
				localStorage.setItem('password', this.password.value);
				localStorage.setItem('user', this.username.value);
				auth(this.email.value, this.password.value, this.username.value)
					.catch(e => this.setState(setErrorMsg(e)))
					setTimeout(() => {
						localStorage.removeItem('password');
						localStorage.removeItem('user');
				}, 1500);
			}
			else{
				this.setState({
					loginMessage: "You need to complete all inputs"
				})
			}
		}
	
		handleClickRegister(e){
			this.email.value = "";
			this.password.value = "";
			this.setState({
				showLogin:false,
				Classtab:"inactive underlineHover",
				Classtab2:"active",
				username:"",
				password:"",
				email:""
			})
		}

		handleClickLogin(e){
			this.email.value = "";
			this.password.value ="";
			this.username.value="";
			this.setState({
				showLogin:true,
				Classtab:"active",
				Classtab2:"inactive underlineHover",
			})
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
	const showLogin = this.state.showLogin;
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
								<h4 
								className={this.state.Classtab} onClick={e => this.handleClickLogin(e)}> Sign In </h4>
								<span className="login-line"></span>
								<h4 
								className={this.state.Classtab2}
								onClick={e => this.handleClickRegister(e)}> Sign Up </h4>
							</div>
							{showLogin ? (
							<div className="loginScreen">
								<div className="fadeIn first">
								</div>
								<label className= "fadeIn first">Email</label>
								<br/>
								<input 
									type="text" 
									id="login" 
									className="fadeIn first" 
									name="Email" 
									placeholder="Type your email here" 
									ref={(email) => this.email = email}
								/>
								<br/>
								<label className="fadeIn second">Password</label>
								<br/>
								<input 
									type="password" 
									id="password" 
									className="fadeIn second" 
									name="password" 
									placeholder="Type password here" 
									ref={(password) => this.password = password}
								/>
								<br/>
								<input 
									type="submit" 
									className="fadeIn" 
									value="Sign In" 
									onClick={event => this.handleClick(event)}
								/>
								<a href="forgotPassword"><p className="forgot-password underlineHover">Forgot password ?</p></a>
							</div>
							) : (
								<div className="registerScreen">
								<div className="fadeIn first">
								</div>
								<label className= "fadeIn first">Username</label>
								<br/>
								<input 
									type="text" 
									id="login" 
									className="fadeIn first" 
									name="Email" 
									placeholder="Type your username here" 
									ref={(username) => this.username = username}
								/>
								<br/>
								<label className="fadeIn second">Email</label>
								<br/>
								<input 
									type="text" 
									id="login" 
									className="fadeIn second" 
									name="Email" 
									placeholder="Type your email here" 
									ref={(email) => this.email = email}
								/>
								<br/>
								<label>Password</label>
								<br/>
								<input 
									type="password" 
									id="password" 
									name="password" 
									placeholder="Type strong password here" 
									ref={(password) => this.password = password}
								/>
								<br/>
								<input 
									type="submit" 
									value="Sign Up" 
									onClick={event => this.handleClickRegisterUser(event, this.props.role)}
								/>
							</div>
							)
						}
						</div>
				</div>
			</div>
    	</div>
    );
  }
}
export default Login;
