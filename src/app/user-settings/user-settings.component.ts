import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UserDemo } from '../user-demo';
import {faInfoCircle, faMailBulk, faBars, faSignOutAlt, faBookOpen, faUsersCog, faBook} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { FirebaseAuthService } from '../firebase-auth.service';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private api: ApiService, private route:Router, private auth:AuthService, private afAuth:FirebaseAuthService) { }

  info = faInfoCircle;
  postsAndComments = faMailBulk;
  orders = faBars;
  signOut = faSignOutAlt;
  reservationIcon = faBookOpen;
  usersIcon = faUsersCog;
  manageMenu = faBook;

  loggedUser:UserDemo;
  showAccountInfo:boolean = false;
  showAllPostsAndComments:boolean = false;
  checkAdmin:Boolean = false;

  logSomething(){
    console.log(this.loggedUser);
    
    
  }

  moveTo(page){
    if(this.auth.loggedIn()){
    this.route.navigate([`/user-settings/${page}`])
    }
    else{
      this.route.navigate([`/user-settings-fireGuard/${page}`])
    }
  }

  signOutFnc(){
    if(this.auth.loggedIn()){
      this.auth.signOut();
      this.route.navigate(['']);
    }
    else{
      this.afAuth.signOutFromGoogle().then(success => {
        this.route.navigate(['']);
      })
    }
  };


  ngOnInit(): void {
    const loggedId = localStorage.getItem('loggedId');
    if(loggedId){
      this.showAccountInfo = true;
      this.api.getUserById(loggedId).subscribe( (data) => {
        this.loggedUser = data;
        if(this.loggedUser.position == 'Admin' || this.loggedUser.position == 'Manager'){
          this.checkAdmin = true;
          this.showAllPostsAndComments = true;
        }
      })
      
    }
  };

};
