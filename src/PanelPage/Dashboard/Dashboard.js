import React, { Component } from "react";
import {logout} from '../../helpers/auth';
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { PieChart, Pie, Cell } from 'recharts';

import './Dashboard.css'
import Panel from '../Panel.js'

var dbref = firebase.database();
  
const COLORS = ['#2a2832', '#ffc84a'];
  

export default class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            totalSize:"",
            isUploading: false,
            spaceInBytes:"",
            avatar: '',
            avatarURL: ''
        }
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

    handleChangeUsername = (event) => this.setState({username: event.target.value});
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
    }
    handleUploadSuccess = (filename) => {
        var user = firebase.auth().currentUser.displayName;
        var uid = firebase.auth().currentUser.uid

        this.setState({avatar: filename, progress: 100, isUploading: false});
        
        firebase.storage().ref(user).child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));

        firebase.storage().ref(user).child(filename).getMetadata()
            .then(function(metadata) {
                dbref.ref(`users/${uid}/info/spaceInBytes`)
                .once('value', function(snapshot) {
                    setTimeout(() => {
                        this.setState({
                            spaceInBytes:snapshot.val() + metadata.size
                        })
                    }, 1000);
                    dbref.ref().child(`users/${uid}/info`)
                        .update ({
                            spaceInBytes: snapshot.val() + metadata.size,
                        })
                }.bind(this));
            }.bind(this))

            .catch(function(error) {
                console.log(error)
            });      
            dbref.ref(`users/${uid}/info/disk`)
                .update({
                    filename:filename
                })
    };

    componentDidUpdate(prevState) {
        var uid = firebase.auth().currentUser.uid
        if (this.state.spaceInBytes !== prevState.spaceInBytes) {
            console.log("xdxd")
        }
    }

    componentDidMount = () => {
        var uid = firebase.auth().currentUser.uid
        dbref.ref(`users/${uid}/info/spaceInBytes`)
        .once('value', function(snapshot) {
            var bytes = snapshot.val()
                    
            if (bytes>=1073741824){
                bytes=(bytes/1073741824).toFixed(1)+' GB';
            }
            else if (bytes>=1048576){
                bytes=(bytes/1048576).toFixed(1)+' MB';
            }
            else if (bytes>=1024){
                bytes=(bytes/1024).toFixed(1)+' KB';
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

            this.setState({
                totalSize:bytes
            });
        }.bind(this))
    };

    render(){
        const data = [
            {name: 'Free Space', value: 5000000000 - this.state.spaceInBytes},
            {name: 'Used Space', value: this.state.spaceInBytes},
        ];
        var metadata = {
            customMetadata: {
              'location': 'Yosemite, CA, USA',
              'activity': 'Hiking'
            }
        }
        var user = firebase.auth().currentUser.displayName;
        return(
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
                            {this.state.totalSize}
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
                            <PieChart width={600} height={600} onMouseEnter={this.onPieEnter}>
                                <Pie
                                data={data}
                                cx={120}
                                cy={200}
                                innerRadius={85}
                                outerRadius={120}
                                fill="#8884d8"
                                stroke=""
                                paddingAngle={0}
                                dataKey="value"
                                >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                }
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="panel-sections__files">
                            <h1>Lastest uploaded files</h1>
                            <p onClick = {() => {
                                logout()
                            }}>Logout</p>
                        </div>
                    </div>
                ]}/>
        )
    }

}