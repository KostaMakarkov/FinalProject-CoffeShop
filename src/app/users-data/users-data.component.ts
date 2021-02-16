import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CheckuserService } from '../checkuser.service';
import { FirebaseAuthService } from '../firebase-auth.service';
import { UserDemo } from '../user-demo';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent implements OnInit {

  constructor(private router:Router, private api:ApiService, private auth:AuthService, private fAuth: CheckuserService) { }
  
  myUsersArry:UserDemo[]=[];
  loggedUser:UserDemo;
  checkAdmin:boolean = false;

  changeUserPosition(position, email){
    const positionChange = {"position" : position, "email" : email}
    const areYouSure = prompt('Are you sure you want to make the changes?');
    if(areYouSure == 'yes'){
      this.api.editPosition(positionChange).subscribe()
      window.location.reload();
    }
  }


  ngOnInit(): void {
    const loggedId = localStorage.getItem('loggedId');
    if(loggedId){
      this.api.getUserById(loggedId).subscribe( (data) => {
        this.loggedUser = data;
        const loggedUserPosition = this.loggedUser.position;
        if(loggedUserPosition == 'Admin'){
          this.api.getAllUsers().subscribe( (data) => {
            this.myUsersArry = data;
            this.checkAdmin = true;
          })
        };
        if(loggedUserPosition == 'Manager'){
          this.api.getUsersByPosition('User').subscribe( (data) => {
            this.myUsersArry = data;
            console.log(this.myUsersArry);
            
          });
        };
      })
    };
  };
};
