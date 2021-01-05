import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faHome, faSignInAlt, faList, faUsers, faBookOpen, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route:Router) { }
  homeIcon = faHome;
  aboutUsIcon = faUsers;
  menuIcon = faList;
  forumIcon = faBookOpen;
  signInIcon = faSignInAlt;
  cartIcon = faShoppingCart;

  num:number;
  myShoppingCart:any=[];

  moveTo(tab){
    this.route.navigate([`${tab}`])
  };
  moveToCheckout(){
    this.route.navigate(['/checkout']);
  }
  
  ngOnInit(): void {
    let cartItems= localStorage.getItem('cartList');
    let cartList= JSON.parse(cartItems);
    this.num= cartList.length;
  }

}
