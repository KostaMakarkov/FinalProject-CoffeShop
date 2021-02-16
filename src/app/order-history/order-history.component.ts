import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CheckuserService } from '../checkuser.service';
import { FirebaseAuthService } from '../firebase-auth.service';
import { UserDemo } from '../user-demo';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private router:Router, private api:ApiService, private auth:AuthService, private fAuth: CheckuserService) { }

  backIcon = faArrowAltCircleLeft;

  loggedUser:UserDemo;
  adminIsLogged:boolean = false;

  orderArray;


  goBackTo(){
    this.router.navigate(['/']);
  }

  changeList(value: string){
    if(value == 'all'){
      this.api.allOrdersHistory().subscribe( (data) => {
        this.orderArray = data;
      })
    }
    if(value == 'onlymy'){
      this.api.myOrderHistory(this.loggedUser.email).subscribe( (data) => {
        this.orderArray = data;
      })
    }
    else{

    }
    
  }

  ngOnInit(): void {
    const loggedId = localStorage.getItem('loggedId')
    if(loggedId){
      let loggedEmail;
      this.api.getUserById(loggedId).subscribe( (data) => {
        this.loggedUser = data;
        loggedEmail = this.loggedUser.email;
        this.api.myOrderHistory(loggedEmail).subscribe( (data) => {
          this.orderArray = data;
          this.orderArray.reverse();
        });
        if(this.loggedUser.position == 'Admin' || this.loggedUser.position == 'Manager'){
          this.adminIsLogged = true;
        }
      });
    }
    else{
      if(this.fAuth.getCurrentUser()){
        let fireLogged;
        this.fAuth.getCurrentUser().then(user => {
          fireLogged = user
          this.api.myOrderHistory(fireLogged.email).subscribe( (data) => {
            this.orderArray = data;
            this.orderArray.reverse();
          });
        });
        
      };
    };
  };

};
