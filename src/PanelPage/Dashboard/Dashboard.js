import React, { Component } from "react";
import {logout} from '../../helpers/auth';
import * as firebase from 'firebase';

import './Dashboard.css'
import Panel from '../Panel.js'
import arrow from '../../images/down-arrow.png';

var storageRef = firebase.storage().ref();

export default class Dashboard extends Component{

    handleUpload(e){

        console.log("lil")
    }

    render(){
        return(
            <div className="Panel-dashboard">
                <Panel content = {[                
                    <div className="panel-sections" key={1}>
                        <div className="panel-sections__disk">
                            <h1>Space Usage</h1>
                            <input type="file"/>
                            <input type="submit" onSubmit={this.handleUpload()}/>
                        </div>
                        <div className="panel-sections__account">
                            <h1>2.3/5 GB</h1>
                            <p onClick = {() => {
                                logout()
                            }}>Logout</p>
                        </div>
                    </div>
                ]}/>
            </div>  
        )
    }

}