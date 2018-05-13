import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import './Login.css'


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
      isLogged:false
    };
		this.handleClick = this.handleClick.bind(this);
  }

  updateInputValueUsername(evt){
		this.setState({
				username: evt.target.value
		});
	}
 	updateInputValuePassword(evt){
		this.setState({
				password: evt.target.value
		});
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

  handleClick(event) {

    var payload = {
      username: this.state.username,
      password: this.state.password
		};
		
		const style = {
			borderLeftColor: '#ffcc00'
		};

		setTimeout(function(){
			if(this.state.validPassword !== 1 || this.state.validUsername !== 1){
				const style = {
					borderColor: '#5cb85c'
				};
			}
		}.bind(this), 3000)

		var password = {
			validPassword: this.state.validPassword
		}

    if(this.state.username.length > 0 &&
      this.state.password.length > 0)
    {
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
							password.validPassword = 1
	      		}
	      		else {
							password.validPassword = 2
	      		}
	    	})
	    if(this.state.validUsername === 1 &&
	       this.state.validPassword === 1){
	        	this.setState({
	           		isLogged:true
	          })
	    	console.log("is Logged " + this.state.isLogged)
			}

			setTimeout(function(){
			this.setState({
				classBg: "auth-bg show",
				authClass:"authContent show"
			})
			if(this.state.validPassword === 1 && this.state.validUsername === 1){
				
				this.setState({
					classCircle: this.state.classCircle +  " show",
					classText: this.state.classText + " show",
				})
				setTimeout(function(){
					this.setState({
						classTick: "checkmark draw show",
						classCircle: "circle-loader load-complete show"
					})
				}.bind(this), 2000)
				setTimeout(function(){
					//window.location = 'register';
				}, 3000)
			}

			else if (this.state.validPassword !== 1 || this.state.validUsername !== 1){
				this.setState({
					classCircle: this.state.classCircle +  " show",
					classText: this.state.classText + " show",
				})

				setTimeout(function(){
					this.setState({
						classTick2: "checkmark2 draw show",
						classCircle: "circle-loader load-complete show"
					})
				}.bind(this), 2000)
				setTimeout(function(){
					//window.location = 'register';
				}, 3000)
			}
			}.bind(this), 500)
		
	    setTimeout(function(){
				console.log("Username " + this.state.validUsername)	
				console.log("Password " + password.validPassword)
			}.bind(this),2000)

	   	this.setState({
			clicked: this.state.clicked + 1
		})
		}
		else{
			this.setState({
				clicked: this.state.clicked + 1
			})
		}
  }

//SET TIMEOUT ON CHECKMARK, CHANGE CLASS, TURN CLASS

	auth(){
	  	return(
		  	<div className="auth">
			  	<div className = {this.state.authClass}>
					<div className={this.state.classCircle} >
						<div className={this.state.classTick}></div>
						<div className={this.state.classTick2}></div>
					</div>
					<h3 className={this.state.classText} >Authenticating...</h3>	  		
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
					name="login" 
					placeholder="Login" 
					style = {this.getStyleUsername()}
					onChange={evt => this.updateInputValueUsername(evt)}
				/>
				<input 
					type="password" 
					id="password" 
					className="fadeIn third" 
					name="login" 
					style = {this.getStylePassword()}
					placeholder="Password" 
					onChange={evt => this.updateInputValuePassword(evt)}
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
export default Login;
