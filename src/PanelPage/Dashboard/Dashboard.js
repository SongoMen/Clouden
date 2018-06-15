import React, { Component } from "react";
import {logout} from '../../helpers/auth';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import './Dashboard.css'
import Panel from '../Panel.js'

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
        console.log(filename.size)
        this.setState({avatar: filename, progress: 100, isUploading: false});
        var user = firebase.auth().currentUser.displayName;
        var uid = firebase.auth().currentUser.uid

        firebase.storage().ref(user).child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));

        firebase.storage().ref(user).child(filename).getMetadata()
            .then(function(metadata,user) {
                var bytes = metadata.size
        
                if (bytes>=1073741824){
                    bytes=(bytes/1073741824).toFixed(2)+' GB';
                }
                else if (bytes>=1048576){
                    bytes=(bytes/1048576).toFixed(2)+' MB';
                }
                else if (bytes>=1024){
                    bytes=(bytes/1024).toFixed(2)+' KB';
                }
                else if (bytes>1){
                    bytes=bytes+' bytes';
                }
                else if (bytes===1){
                    bytes=bytes+' byte';
                }
                else{
                    bytes='0 byte';
                }
                console.log(bytes)

                firebase.database().ref().child(`users/${uid}/info`)
                    .update ({
                        spaceInBytes:metadata.size,
                        spaceTotal:bytes
                    })
                    .then(() => user)
            })
            .catch(function(error) {
                console.log(error)
        });
          
    };

    render(){
        var metadata = {
            customMetadata: {
              'location': 'Yosemite, CA, USA',
              'activity': 'Hiking'
            }
          }
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
                                <img src={this.state.avatarURL} alt="xdxd"/>
                            }
                        <FileUploader
                            id="fileupload"
                            accept="image/*"
                            name="avatar"
                            metadata={metadata}
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