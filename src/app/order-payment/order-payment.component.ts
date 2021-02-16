import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { MenuDemo } from '../menu-demo';
import { OrderAddressDemo } from '../order-address-demo';
import { OrderDetailsDemo } from '../order-details-demo';
import { OrderNotesDemo } from '../order-notes-demo';
import { render } from 'creditcardpayments/creditCardPayments'


@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService, private api:ApiService) {
  //  setTimeout(() => {
  //    render(
  //      {
  //        id: "#paypalDiv",
  //        currency: "USD",
  //        value: "100.00",
  //        onApprove: (details) => {
  //          this.router.navigate(['/'])
  //          
  //          alert("Transaction Successfull")
  //        }
  //      }
  //    )
  //  }, 3000);
   }

  myOrderSummary:MenuDemo[];
  myOrderDetails:OrderDetailsDemo;
  myOrderAddress:OrderAddressDemo;
  myOrderNotes:OrderNotesDemo;
  totalSum = 0;













  ngOnInit(): void {
  const cartFromServer = localStorage.getItem('dishId');
  this.api.getCurrentOrders(cartFromServer).subscribe((data) => {
    this.myOrderSummary = data;
    this.myOrderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    this.myOrderAddress = JSON.parse(localStorage.getItem('orderAddress'));
    this.myOrderNotes = JSON.parse(localStorage.getItem('orderNotes'));;
    this.myOrderSummary.forEach(ele => {
      this.totalSum += Number(ele.dishPrice)
    })
    const Order = 
    [
      {'orderItems' : this.myOrderSummary},
      {'orderDetails' :  this.myOrderDetails},
      {'orderAddress' : this.myOrderAddress},
      {'orderNotes' : this.myOrderNotes},
      {'totalSum' : this.totalSum}
    ];
    
    this.api.sendOrder(Order).subscribe();
    localStorage.removeItem('dishId');
    localStorage.removeItem('addDish');
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('orderAddress');
    localStorage.removeItem('orderNotes');
    this.router.navigate(['/'])
  }
  )

  }

}
