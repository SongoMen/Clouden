import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from 'react-router-dom';

import './Login.css'

var login = {
	validUsername:0,
	validPassword:0,
	isLogged:false
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleClick(event) {

    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    if(this.state.username.length > 0 &&
      this.state.password.length > 0)
    {
	    firebase.database()
	      	.ref(`/users`)
	      	.once("value")
	        .then(snapshot => {
	          if(snapshot.hasChild(payload.username)){
	            login.validUsername = 1
	        	} 
	          else{
	            login.validUsername = 2
	          }
	        })
	    firebase.database()
	    	.ref('/users/' + payload.username + '/password')
	      	.once("value", function(snapshot){
	      		if(snapshot.val() === payload.password){
	      			login.validPassword = 1
	      		}
	      		else {
	     			login.validUsername = 2
	      		}
	    	})
	    if(login.validUsername === 1 &&
	       login.validPassword === 1){
	    	login.isLogged = true
	    	console.log("is Logged " + login.isLogged)
	    }
	    console.log("Username " + login.validUsername)	
	    console.log("Password " + login.validPassword)
	}
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

//SET TIMEOUT ON CHECKMARK, CHANGE CLASS, TURN CLASS

	auth(classDraw = "circle-loader load-complete", checkmark = "checkmark draw show"){
	  	return(
		  	<div className="auth">
		  	<div className={classDraw}>
			  <div className={checkmark}></div>
			</div>
				<h3>Authenticating...</h3>	  		
		  	</div>
	  	)
  }



  render() {
    return (
      <div className="loginScreen">
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
		<div className="wrapper fadeInDown">
		  	<div id="formContent">
			    <h2 className="active"> Sign In </h2>
				<div className="fadeIn first">
		      		<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
		    	</div>
		    	{this.auth()}
				<input 
					type="text" 
					id="login" 
					className="fadeIn second" 
					name="login" 
					placeholder="Login" 
					onChange={evt => this.updateInputValueUsername(evt)}
				/>
				<input 
					type="text" 
					id="password" 
					className="fadeIn third" 
					name="login" 
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
