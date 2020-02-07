import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

var config = {
  apiKey: "AIzaSyCYyiiyITT_sSblgRqYpWKPF2-yUli81l8",
  authDomain: "webapp-0021.firebaseapp.com",
  databaseURL: "https://webapp-0021.firebaseio.com",
  projectId: "webapp-0021",
  storageBucket: "webapp-0021.appspot.com",
  messagingSenderId: "24837464252",
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function auth(email, pw) {
  var username = localStorage.getItem("user");
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .then(function() {
      return firebase.auth().currentUser.updateProfile({
        displayName: username,
      });
    });
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
  var username = localStorage.getItem("user");
  var pw = localStorage.getItem("pw");
  return ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      username: username,
      password: pw,
      uid: user.uid,
      spaceInBytes: 0,
    })
    .then(() => user);
}
