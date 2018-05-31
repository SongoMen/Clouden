import React,{ Component} from 'react';
import {resetPassword} from '../helpers/auth'

import './forgotPassword.css'

function setErrorMsg(error) {
	return {
	  loginMessage: error
    }
  }

export default class forgotPassword extends Component{
    constructor(){
        super()
        this.state = {
            email:""
        }
    }

    resetPassword = (event) => {
		resetPassword(this.email.value)
		  .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
          .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
	}

    render(){
        const error = this.state.loginMessage
        return(
            <div className="forgotPassword-wrapper">
                <h1 className="forgotPassword-text">Reset Password</h1>
                <input 
                type="text" 
                className="forgotPassword-input"
                placeholder="Type your account email here" 
                ref={(email) => this.email = email}
                />
                <br/>
                <h3 className="forgotPassword-error">{error}</h3>
                <br/>
                <input
                type="submit"
                className="forgotPassword-submit"
                value="Reset Password"
                onClick={event => this.resetPassword(event)}
                />
            </div>
        )
    }
}