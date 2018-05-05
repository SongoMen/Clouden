import React, { Component } from "react";
import { Link } from "react-router-dom";
import './App.css';

class Main extends Component {
	constructor(props){
		super();
	}
	render(){
		return(
			<div className="banner">
				<nav>
					<ul>
						<li>Home</li>
						<li>Pricing</li>
						<li>Why Us </li>
						<li>
							<div className="login">
								<h1>Login</h1>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		)
	}

}
export default Main;