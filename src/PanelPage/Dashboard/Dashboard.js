import React, { Component } from "react";
import * as firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { PieChart, Pie, Cell } from 'recharts';
import $ from 'jquery'; 

import './Dashboard.css'
import Panel from '../Panel.js'

var dbref = firebase.database();
  
const COLORS = ['#353642', '#dc323c'];
  

export default class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            totalSize:"",
            isUploading: false,
            spaceInBytes:"",
            avatar: '',
            avatarURL: '',
            uploadTab:false
        }
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

    handleChangeUsername = (event) => {
        this.setState({username: event.target.value});
    }
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
                var spaceInBytes = parseInt(this.state.spaceInBytes, 10)
                dbref.ref().child(`users/${uid}/info`)
                    .update ({
                        spaceInBytes: spaceInBytes + metadata.size,
                    })
            }.bind(this))
            .catch(function(error) {
                console.log(error)
            });

        var filenameText = filename.replace(/\.[^/.]+$/, "");      
        dbref.ref(`users/${uid}/info/disk`)
            .update({
                [filenameText]:filename
            })
    };

    componentDidUpdate(prevState) {
        if (this.state.spaceInBytes !== prevState.spaceInBytes) {
            
        }
    }

    componentDidMount = () => {
        var uid = firebase.auth().currentUser.uid
        dbref.ref(`users/${uid}/info/spaceInBytes`)
        .once('value', function(snapshot) {
            this.setState({
                spaceInBytes:snapshot.val()
            })
            var bytes = this.state.spaceInBytes
                    
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
        firebase.database().ref(`/users/${uid}/info/disk`).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var content = "";

                content += '<li>' + key + '</li>';
            $('#lastFiles').append(content);
                console.log(key)
            });
        });
    };

    render(){
        const data = [
            {name: 'Free Space', value: 5000000000 - this.state.spaceInBytes},
            {name: 'Used Space', value: (this.state.spaceInBytes * 2) - this.state.spaceInBytes},
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
                <div className="dashboard" key={1}>         
                    <div className="sections">
                        <div className="sections__disk">           
                            <h1>Space Usage</h1>
                            {this.state.isUploading &&
                                <p>Progress: {this.state.progress}</p>
                            }
                            {this.state.totalSize}
                            <PieChart width={350} height={350} onMouseEnter={this.onPieEnter} style={{transform:'rotate(-90deg)'}}>
                                <Pie
                                data={data}
                                cx={120}
                                cy={200}
                                innerRadius={85}
                                outerRadius={120}
                                stroke=""
                                metadata={metadata}
                                paddingAngle={0}
                                dataKey="value"
                                >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                }
                                </Pie>
                            </PieChart>
                        </div>
                        <div className="sections__files">
                            <h1>Lastest uploaded files</h1>
                            <ul id="lastFiles"></ul>
                        </div>
                        <label className="sections__upload">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 486.3 486.3" xmlSpace="preserve">
                                    <g>
                                        <path d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
                                            c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
                                            C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
                                            c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
                                            c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
                                            c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
                                            c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
                                            c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"/>
                                        <path d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
                                            c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
                                            C310.4,285.3,318.9,285.3,324.2,280z"/>
                                    </g>
                                </svg>
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    storageRef={firebase.storage().ref(user)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                                <p>Click here to quickly upload<br/> everything you want !</p>
                        </label>
                    </div>
                </div>
            ]}/>
        )
    }
}
