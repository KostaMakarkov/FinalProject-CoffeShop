import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth:AngularFireAuth) { }

  googleLogin(){
    return new Promise(
      (resolve, reject) => {
        const provider = new firebase.default.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth.signInWithPopup(provider).then(
          userData => {
            resolve(userData);
          },
          err => {
            reject(err);
          }
        )
      }
    )
  };


  signOutFromGoogle(){
    return new Promise(
      (resolve, reject) => {
        if(firebase.default.auth().currentUser){
          this.afAuth.signOut();
          resolve (true);
        }
        else{
          reject('error with signOut');
        }
      }
    )
  };
};


