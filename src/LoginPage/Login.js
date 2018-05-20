import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Helmet} from 'react-helmet';

import './Login.css';
import { userActions } from '../_actions/userActions';

class Login extends Component {
  constructor(props) {
	super(props);
	this.props.dispatch(userActions.logout());
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

  	handleClick(event) {
		event.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;

		var payload = {
			username: this.state.username,
			password: this.state.password
		};
		var loginPassword = {
			validPassword: this.state.validPassword
		}
		if(this.state.username.length > 0 && this.state.password.length > 0){
			firebase.database()
				.ref(`/users`)
				.once("value")
				.then(snapshot => {
					if(snapshot.hasChild(payload.username)){
						this.setState({
							validUsername:1
						})
					} 
					else{
						this.setState({
							validUsername:2
						})	          
					}
				})
			firebase.database()
				.ref('/users/' + payload.username + '/password')
				.once("value", function(snapshot){
					if(snapshot.val() === payload.password){
						loginPassword.validPassword = 1
					}
					else {
						loginPassword.validPassword = 2
					}
				})
				
			setTimeout(function(){
				this.setState({
					classBg: "auth-bg show",
					authClass:"authContent show",
				})
				if(loginPassword.validPassword === 1 && this.state.validUsername === 1){
					this.setState({
						LoggedIn:true,
						classCircle: this.state.classCircle +  " show",
						classText: this.state.classText + " show",
					})
					setTimeout(function(){
						localStorage.setItem('user', this.state.username);
						dispatch(userActions.login(username));
						this.setState({
							classTick: "checkmark draw show",
							authText:"Welcome "+ this.state.username,
							classCircle: "circle-loader load-complete show"
						})
						
					}.bind(this), 2000)
					setTimeout(function(){
						window.location = 'Panel';
					}, 3500)
				}

				else if (loginPassword.validPassword !== 1 || this.state.validUsername !== 1){
					this.setState({
						classCircle: this.state.classCircle +  " show",
						classText: this.state.classText + " show",
					})
					setTimeout(function(){
						this.setState({
							classTick2: "checkmark2 draw show",
							authText:"Wrong username or password.",
							classCircle: "circle-loader load-complete show red"
						})
					}.bind(this), 2000)
					setTimeout(function(){
						this.setState({
							authClass: 'authContent',
							classCircle:"circle-loader",
							classTick:"checkmark draw",
							classTick2:"checkmark2 draw",
							classBg: 'auth-bg',
							authText:'Authenticating...'
						})
					}.bind(this), 3500)
				}
			}.bind(this), 1000)
			
			setTimeout(function(){
				console.log("Username " + this.state.validUsername)	
				console.log("Password " + loginPassword.validPassword)
			}.bind(this),1000)
			}
			this.setState({
				clicked: this.state.clicked + 1
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
	const { loggingIn } = this.props;
	const { username, password, submitted } = this.state;
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
						name="username" 
						value={username}
						placeholder="Login" 
						style = {this.getStyleUsername()}
						onChange={this.handleChange}
					/>
					<input 
						type="password" 
						id="password" 
						value={password}
						className="fadeIn third" 
						name="password" 
						style = {this.getStylePassword()}
						placeholder="Password" 
						onChange={this.handleChange}
					/>
					<input type="submit" className="fadeIn fourth" value="Log In" onClick={event => this.handleClick(event)}/>
					<div id="formFooter">
						<Link to="/register" className="underlineHover">Don't have account ?</Link><br/>
						<Link to="/" className="underlineHover" >Forgot Password?</Link>
					</div>
				</div>
			</div>
    	</div>
    );
  }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login}; 
