import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from 'react-router-dom';

import './Login.css'

var login = {
	validUsername:0,
	validPassword:0,
	isLogged:false,
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
      isLogged:false
    };
    this.handleClick.bind(this);
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
				    () => {
				    this.setState({
				        validPassword:1
				    });
					}
	      		}
	      		else {
				    () => {
					    this.setState({
					        validPassword:2
					    });
					}
	      		}
	    	})
	    if(this.state.validUsername === 1 &&
	       this.state.validPassword === 1){
	        	this.setState({
	           		isLogged:true
	            })
	    	console.log("is Logged " + this.state.isLogged)
	    }
	    
	    console.log("Username " + this.state.validUsername)	
	    console.log("Password " + this.state.validPassword)

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

  	classChangeCircle(){
  		if(this.state.validUsername !== 0){
  			return(
  				'circle-loader load-complete'
  			)
  		}
  		else if(this.state.clicked !== 0 && this.state.validUsername !== 0) {
  			return 'circle-loader'
  		}
  	}

  	classChangeTick(){
  		if(this.state.validUsername !== 0){
  			return(
  				'checkmark draw show'
  			)
  		}
  		else{
  			return 'checkmark draw'
  		}
  	}

	classChangeText(){
		if(this.state.validUsername !== 0){
			return(
				'show'
			)
		}
		else{
			return ''
		}
	}



//SET TIMEOUT ON CHECKMARK, CHANGE CLASS, TURN CLASS

	auth(){

	  	return(
		  	<div className="auth">
			  	<div className = "authContent">
					<div className={this.classChangeCircle()}>
						<div className={this.classChangeTick()}></div>
					</div>
					<h3 className={this.classChangeText()} class="authText">Authenticating...</h3>	  		
				</div>
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
