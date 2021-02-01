import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderSummary } from '../order-summary';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderForm:FormGroup;
  myOrderArry:MenuDemo[]=[];
  backIcon = faArrowAltCircleLeft;

  totalSum:number = 0;

  constructor(private api:ApiService, private router:Router, private auth:AuthService) {
    this.orderForm = new FormGroup({
      'addressCity' : new FormControl('', Validators.required),
      'addressStreet' : new FormControl('', Validators.required),
      'addressApartment' : new FormControl('', Validators.required),
      'addressZip' : new FormControl(''),
      'orderNotes' : new FormControl('None'),
      'deliveryNotes' : new FormControl('None'),
      'additionalNote' : new FormControl('None')
    })
   }

  goBackTo(){
    this.router.navigate(['/menu']);
  }

  pay(){
    const orderAddressNnotes = new OrderSummary(
      this.orderForm.controls.addressCity.value,
      this.orderForm.controls.addressStreet.value,
      this.orderForm.controls.addressApartment.value,
      this.orderForm.controls.addressZip.value,
      this.orderForm.controls.orderNotes.value,
      this.orderForm.controls.deliveryNotes.value,
      this.orderForm.controls.additionalNote.value
    )
    const orderSummary = {
      "orderItems" : this.myOrderArry,
      "orderAddressAndNotes" : orderAddressNnotes}
    
    this.api.sendOrder(orderSummary).subscribe();
    
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
      this.orderForm = new FormGroup({
        'addressCity' : new FormControl(loggedUser.address.addressCity, Validators.required),
        'addressStreet' : new FormControl(loggedUser.address.addressStreet, Validators.required),
        'addressApartment' : new FormControl(loggedUser.address.addressApartment, Validators.required),
        'addressZip' : new FormControl(loggedUser.address.addressZip),
        'orderNotes' : new FormControl('None',),
        'deliveryNotes' : new FormControl('None'),
        'additionalNote' : new FormControl('None')
      })
      
    }
  }

}
