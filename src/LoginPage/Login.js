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
				<div id="formContent">
					<h2 className="active"> Sign In </h2>
					<div className="fadeIn first">
						<svg xmlns="http://www.w3.org/2000/svg" 
							xmlnsXlink="http://www.w3.org/1999/xlink" 
							version="1.1" 
							id="icon" 
							x="0px" y="0px" 
							viewBox="0 0 512 512" style={{enableBackground:'new 0 0 512 512'}} xmlSpace="preserve">
							<g>
								<circle style={{fill:'#4DBAF6'}} cx="256" cy="75.17" r="20"/>
								<circle style={{fill:'#4DBAF6'}} cx="256" cy="437.09" r="28"/>
							</g>
							<g>
								<circle style={{fill:'#FFB954'}} cx="429.95" cy="82.05" r="28"/>
								<circle style={{fill:'#FFB954'}} cx="82.05" cy="429.95" r="20"/>
							</g>
							<circle style={{fill:'#ffc000'}} cx="256" cy="256" r="123"/>
							<path style={{fill:'#FF5D5D'}} d="M307.471,293.765l-20.348-3.795l-62.324,0.014l-20.271,3.781  C187.991,296.849,176,311.283,176,328.106v21.318C197.508,367.859,225.451,379,256,379s58.492-11.141,80-29.576v-21.318  C336,311.283,324.009,296.849,307.471,293.765z"/>
							<path style={{fill:'#FFCDAC'}} d="M256,208.828L256,208.828c-22.091,0-40,17.909-40,40v16c0,22.091,17.909,40,40,40l0,0  c22.091,0,40-17.909,40-40v-16C296,226.736,278.091,208.828,256,208.828z"/>
							<path d="M256,123c-73.336,0-133,59.664-133,133s59.664,133,133,133s133-59.664,133-133S329.336,123,256,123z M186,344.644v-16.538  c0-12.002,8.563-22.31,20.362-24.511l14.968-2.792c8.996,8.673,21.217,14.024,34.67,14.024s25.674-5.351,34.67-14.023l14.968,2.792  c11.799,2.2,20.362,12.508,20.362,24.51v16.538C306.738,359.887,282.414,369,256,369S205.262,359.887,186,344.644z M286,264.828  c0,16.542-13.458,30-30,30s-30-13.458-30-30v-16c0-16.542,13.458-30,30-30s30,13.458,30,30V264.828z M345.845,324.448  c-1.627-20.036-16.488-36.773-36.541-40.514l-6.619-1.235c2.134-5.554,3.315-11.576,3.315-17.872v-16c0-27.57-22.43-50-50-50  s-50,22.43-50,50v16c0,6.296,1.181,12.318,3.315,17.872l-6.619,1.235c-20.053,3.74-34.914,20.478-36.541,40.514  C151.637,305.439,143,281.711,143,256c0-62.309,50.691-113,113-113s113,50.691,113,113C369,281.711,360.363,305.439,345.845,324.448  z"/>
							<path d="M392.06,448.839C352.121,477.075,305.072,492,256,492c-27.156,0-53.776-4.573-79.118-13.593  c-5.204-1.853-10.922,0.864-12.774,6.068c-1.852,5.203,0.865,10.922,6.068,12.774C197.677,507.037,226.552,512,256,512  c53.23,0,104.271-16.193,147.606-46.83c4.509-3.188,5.581-9.429,2.393-13.938C402.81,446.723,396.57,445.649,392.06,448.839z"/>
							<path d="M111.197,67.135c2.044,0,4.107-0.625,5.885-1.922C157.63,35.634,205.667,20,256,20c30.535,0,60.247,5.748,88.309,17.083  c5.121,2.071,10.949-0.405,13.017-5.527c2.069-5.121-0.406-10.949-5.527-13.017C321.346,6.237,289.114,0,256,0  c-54.599,0-106.711,16.963-150.705,49.056c-4.461,3.254-5.44,9.51-2.186,13.972C105.068,65.711,108.111,67.135,111.197,67.135z"/>
							<path d="M461.461,103.299c4.217-6.226,6.487-13.561,6.487-21.247c0-10.15-3.953-19.693-11.13-26.87  c-7.177-7.178-16.72-11.13-26.87-11.13s-19.693,3.953-26.87,11.13c-7.178,7.177-11.13,16.72-11.13,26.87s3.953,19.693,11.13,26.87  c7.177,7.178,16.72,11.13,26.87,11.13c5.743,0,11.29-1.267,16.325-3.666C476.216,157.038,492,205.111,492,256  c0,30.72-5.815,60.599-17.284,88.806c-2.08,5.116,0.381,10.95,5.497,13.03c1.234,0.501,2.509,0.739,3.763,0.739  c3.948,0,7.688-2.354,9.267-6.236C505.689,321.728,512,289.315,512,256C512,200.276,494.547,147.665,461.461,103.299z   M417.22,94.779c-3.4-3.399-5.272-7.92-5.272-12.728s1.872-9.328,5.272-12.728c3.399-3.4,7.92-5.272,12.728-5.272  s9.328,1.872,12.728,5.272c3.4,3.399,5.272,7.92,5.272,12.728s-1.872,9.328-5.272,12.728l0,0c-3.399,3.4-7.92,5.272-12.728,5.272  S420.62,98.18,417.22,94.779z"/>
							<path d="M256,475.086c20.953,0,38-17.047,38-38s-17.047-38-38-38c-16.096,0-29.877,10.065-35.406,24.227  c-49.915-10.539-93.087-43.307-116.681-89.067c-2.531-4.909-8.56-6.837-13.471-4.306c-4.909,2.531-6.836,8.562-4.306,13.471  c26.668,51.725,75.751,88.579,132.378,99.882C221.488,461.303,237.161,475.086,256,475.086z M256,419.086c9.925,0,18,8.075,18,18  s-8.075,18-18,18s-18-8.075-18-18S246.075,419.086,256,419.086z"/>
							<path d="M70.728,402.168C37.542,360.174,20,309.652,20,256c0-25.049,3.904-49.707,11.604-73.287  c1.714-5.25-1.152-10.896-6.402-12.61c-5.25-1.716-10.896,1.152-12.61,6.402C4.236,202.093,0,228.839,0,256  c0,58.502,19.223,113.581,55.592,159.281c0.058,0.072,0.124,0.134,0.183,0.204c-6.265,11.396-4.583,26.029,5.064,35.676  c5.849,5.848,13.531,8.772,21.213,8.772s15.365-2.924,21.213-8.772c11.697-11.697,11.697-30.729,0-42.427  C94.484,399.955,81.57,397.766,70.728,402.168z M89.123,437.019c-1.889,1.889-4.4,2.929-7.071,2.929s-5.182-1.04-7.071-2.929  c-1.889-1.889-2.929-4.4-2.929-7.071s1.04-5.182,2.929-7.071s4.4-2.929,7.071-2.929s5.182,1.04,7.071,2.929  c1.889,1.889,2.929,4.4,2.929,7.071S91.012,435.13,89.123,437.019z"/>
							<path d="M436.388,274.015c-5.457-0.845-10.567,2.896-11.411,8.354c-8.085,52.262-40.771,98.606-87.435,123.972  c-4.852,2.638-6.647,8.709-4.01,13.562c1.813,3.335,5.248,5.226,8.794,5.226c1.613,0,3.25-0.392,4.767-1.216  c25.426-13.821,47.755-33.608,64.575-57.223c17.133-24.054,28.569-52.154,33.072-81.263  C445.586,279.968,441.846,274.859,436.388,274.015z"/>
							<path d="M75.614,237.966c0.519,0.08,1.033,0.119,1.542,0.119c4.847,0,9.105-3.532,9.87-8.472  c8.048-51.982,40.502-98.194,86.814-123.617c4.841-2.658,6.612-8.737,3.954-13.578c-2.658-4.842-8.738-6.611-13.578-3.954  c-25.248,13.859-47.415,33.624-64.106,57.157c-17.004,23.975-28.363,51.96-32.849,80.933  C66.417,232.011,70.156,237.121,75.614,237.966z"/>
							<path d="M412.206,174.5c1.72,0,3.463-0.444,5.053-1.377c4.763-2.796,6.357-8.924,3.561-13.687  c-29.224-49.781-78.563-83.376-135.367-92.173c-0.179-0.028-0.356-0.037-0.533-0.055c-3.497-12.689-15.134-22.04-28.92-22.04  c-16.542,0-30,13.458-30,30s13.458,30,30,30c12.26,0,22.821-7.396,27.469-17.959c50.387,8.129,94.12,38.089,120.104,82.351  C405.436,172.733,408.775,174.5,412.206,174.5z M256,85.168c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10  S261.514,85.168,256,85.168z"/>
							<path d="M82.05,92.05c2.64,0,5.21-1.07,7.07-2.93s2.93-4.44,2.93-7.07s-1.07-5.21-2.93-7.07s-4.44-2.93-7.07-2.93  s-5.21,1.07-7.07,2.93s-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07C76.84,90.98,79.42,92.05,82.05,92.05z"/>
							<path d="M429.95,419.95c-2.63,0-5.21,1.07-7.07,2.93s-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07c1.86,1.86,4.44,2.93,7.07,2.93  s5.21-1.07,7.07-2.93c1.86-1.86,2.93-4.44,2.93-7.07s-1.07-5.21-2.93-7.07C435.16,421.02,432.58,419.95,429.95,419.95z"/>
						</svg>
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