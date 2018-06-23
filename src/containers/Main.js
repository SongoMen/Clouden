import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Main.css';

class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
			click:1
		};
	}

	render(){
		return(
			<div className="main">
				<div className="banner">
					<nav>
						<ul>
							<li className="float"><a>Features</a></li>
							<li className="float">
							<a>About Us</a>
							</li>
							<li className="float"><a>Why us</a></li>
							<li className="float"><a>Pricing</a></li>
							<Link to = "/login">
								<li>
									<div className="login2">
										<h1>SIGN IN</h1>
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
						<h1>Meet Clouden</h1>
						<span className="heading-uderline"></span>
						<p>Cloud built for the future with <br/>comfortable dashboard and best security.</p>
						<Link to = "/login">
						<div className="login1">
							<h1>explore the features</h1>
						</div>
						</Link>
						<Link to = "/register">
						<div className="register1">
							<h1>click here to register</h1>
						</div>
						</Link>
					</div>
				</div>
				<div className="section1">
					<div className="text">
						<span className="section1-line"></span>
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