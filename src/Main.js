import React, { Component } from "react";
import { Link } from "react-router-dom";
import './App.css';

class Main extends Component {
	constructor(props){
		super();
	}
	render(){
		return(
			<div className="main">
				<div className="banner">
					<nav>
						<ul>
							<li className="float"><p>Home</p></li>
							<li className="float"><p>Pricing</p></li>
							<li className="float"><p>Why Us</p></li>
							<Link to = "/login">
								<li>
									<div className="login">
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
					<div className = "heading">
						<h1>Stay safe.<br/>Feel better.</h1>
						<p>Use ... to upload your most valuable files to<br/>cloud storage and feel safe about your privacy<br/>and data security.</p>
						<Link to = "/login">
						<div className="login1">
							<h1>Login</h1>
						</div>
						</Link>
						<Link to = "/register">
						<div className="register1">
							<h1>Create account</h1>
						</div>
						</Link>
					</div>
					<div className="arrow-circle">
						<svg 
						xmlns="http://www.w3.org/2000/svg" 
						xmlnsXlink="http://www.w3.org/1999/xlink" 
						version="1.1" 
						id="Capa_1" x="0px" y="0px" 
						viewBox="0 0 21.825 21.825"
						xmlSpace="preserve" 
						width="512px" 
						height="512px">
						<path d="M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651  c-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587  s1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z" fill="#9fa4af"/>
						</svg>
					</div>
				</div>
				<div className="sections">
					<div className="text">
						<span className="about-line"></span>
						<h2>ABOUT US</h2>
						<h1>Who we are?</h1>
						<p className="description">
							sdadsadsad
						</p>
					</div>
					<div className="bottomBar">
						ffsafas
					</div>
				</div>
			</div>
		)
	}

}
export default Main;