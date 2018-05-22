import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCYyiiyITT_sSblgRqYpWKPF2-yUli81l8",
    authDomain: "webapp-0021.firebaseapp.com",
    databaseURL: "https://webapp-0021.firebaseio.com",
    projectId: "webapp-0021",
    storageBucket: "webapp-0021.appspot.com",
    messagingSenderId: "24837464252"
  };

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
    var pw = localStorage.getItem('pw')
    var username = localStorage.getItem('user')
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      username:username,
      password:pw,
      uid: user.uid
    })
    .then(() => user)
}
