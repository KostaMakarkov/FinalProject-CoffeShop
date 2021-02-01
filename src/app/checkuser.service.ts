import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class CheckuserService {

  constructor(private afAuth:AngularFireAuth) { }

  getCurrentUser(){
    return new Promise(
      (resolve, reject) => {
        const user = this.afAuth.authState.subscribe(
          user => resolve(user), err => reject(null)
        )
      }
    )
  }


}
