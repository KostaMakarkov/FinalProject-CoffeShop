import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderAddressDemo } from '../order-address-demo';


@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.css']
})
export class OrderAddressComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  addressForm:FormGroup;
  lArrowIcon = faArrowAltCircleLeft;
  rArrowIcon = faArrowAltCircleRight;


  goBackTo(){
    this.router.navigate(['/order-details'])
  }
  proceedToNext(){
    const orderAddress = new OrderAddressDemo(
      this.addressForm.controls.addressCity.value,
      this.addressForm.controls.addressStreet.value,
      this.addressForm.controls.addressApartment.value,
      this.addressForm.controls.addressZip.value
    )
    localStorage.setItem('orderAddress', JSON.stringify(orderAddress))
    this.router.navigate(['/order-notes']);
  }

  ngOnInit(): void {
    if(this.auth.loggedIn()){
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      this.addressForm = new FormGroup({
        'addressCity' : new FormControl(loggedUser.address.addressCity, Validators.required),
        'addressStreet' : new FormControl(loggedUser.address.addressStreet, Validators.required),
        'addressApartment' : new FormControl(loggedUser.address.addressApartment, Validators.required),
        'addressZip' : new FormControl(loggedUser.address.addressZip)
      })
  }
  else{
    this.addressForm = new FormGroup({
      'addressCity' : new FormControl('', Validators.required),
      'addressStreet' : new FormControl('', Validators.required),
      'addressApartment' : new FormControl('', Validators.required),
      'addressZip' : new FormControl('')
    })
  }

}

}
