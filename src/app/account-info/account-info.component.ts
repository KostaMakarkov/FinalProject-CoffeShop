import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckuserService } from '../checkuser.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService, private router:Router, private checkUser: CheckuserService) {};

  accountInfoForm:FormGroup;
  loggedUser:UserDemo;
  loggedFireUser;
  backIcon = faArrowAltCircleLeft;

  showMeTheDiv:boolean = false;

  changeThisInfo:number = 0;

  goBackTo(){
    this.router.navigate(['/']);
  }

  showChangeDiv(path){
    this.showMeTheDiv = true;
    this.router.navigate([`/user-settings/${path}`])
  }


  ngOnInit(): void {
    const loggedId = localStorage.getItem('loggedId');
    if(loggedId){
      this.api.getUserById(loggedId).subscribe( (data) => {
        this.loggedUser = data;
      });
    }
    else{
    this.checkUser.getCurrentUser().then(user => {
      this.loggedFireUser = user
      console.log(user);
    });
  }
  };

};
