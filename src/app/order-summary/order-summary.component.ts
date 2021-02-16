import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { Router } from '@angular/router';
import {faArrowAltCircleRight, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService, private router:Router) { }
  myOrderArry:MenuDemo[]=[];
  totalSum = 0;
  rArrowIcon = faArrowAltCircleRight;
  lArrowIcon = faArrowAltCircleLeft;

  proceedToNext(){
    this.router.navigate(['/order-details']);
  }
  goBackTo(){
    this.router.navigate(['/menu']);
  }


  ngOnInit(): void {
    const cartFromServer = localStorage.getItem('dishId');
    this.api.getCurrentOrders(cartFromServer).subscribe((data) => {
      this.myOrderArry = data
      this.myOrderArry.forEach(ele => {
        this.totalSum += Number(ele.dishPrice)
      })
    });
    if(this.auth.loggedIn()){
      const loggedUser = JSON.parse(localStorage.getItem('user'));
    }
  }

}
