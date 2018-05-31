import React,{ Component} from 'react';

import './forgotPassword.css'

export default class forgotPassword extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className="forgotPassword-wrapper">
                <h1>Password Reminder</h1>
                <input 
                type="text" 
                className="forgotPassword-input"
                placeholder="Type your account email here" 
                ref={(email) => this.email = email}/>
            </div>
        )
    }
}