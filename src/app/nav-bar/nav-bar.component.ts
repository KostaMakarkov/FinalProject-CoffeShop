import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faHome, faSignInAlt, faList, faUsers, faBookOpen, faShoppingCart, faUserEdit, faUserCog} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route:Router, private auth:AuthService, private api:ApiService) { }
  homeIcon = faHome;
  aboutUsIcon = faUsers;
  menuIcon = faList;
  forumIcon = faBookOpen;
  signInIcon = faSignInAlt;
  cartIcon = faShoppingCart;
  userEditIcon = faUserEdit;
  userCog = faUserCog;

  num:number = 0;
  myShoppingCart:any=[];
 
  check(){
    this.api.check().subscribe(res => {console.log(res);
    });
  }


  moveTo(tab){
    this.route.navigate([`${tab}`])
  };
  moveToWithFire(){
    if(this.auth.loggedIn()){
      this.route.navigate(['/user-settings']);
    }
    else{
      this.route.navigate(['/user-settings-fireGuard'])
    }
  }
  moveToCheckout(){
    this.route.navigate(['/checkout']);
  }


  
  ngOnInit(): void {

    let cartItems= localStorage.getItem('dishId');
    if(cartItems == null){
      this.num = 0;
    }
    else{
        let cartList= JSON.parse(cartItems);
        this.num= cartList.length;  
    }
  }

}
