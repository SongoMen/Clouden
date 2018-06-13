import React, { Component } from "react";
import {logout} from '../../helpers/auth';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import './Dashboard.css'
import Panel from '../Panel.js'

var storageRef = firebase.storage().ref();

export default class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            isUploading: false,
            avatar: '',
            avatarURL: ''
        }
    }

    handleChangeUsername = (event) => this.setState({username: event.target.value});
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
    }
    handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      var user = firebase.auth().currentUser.displayName;
      firebase.storage().ref(user).child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

    render(){
        var user = firebase.auth().currentUser.displayName;
        return(
            <div className="Panel-dashboard">
                <Panel content = {[                
                    <div className="panel-sections" key={1}>
                        <div className="panel-sections__disk">
                            <h1>Space Usage</h1>
                            {this.state.isUploading &&
                                <p>Progress: {this.state.progress}</p>
                            }
                            {this.state.avatarURL &&
                                <img src={this.state.avatarURL} />
                            }
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref(user)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
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