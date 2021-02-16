import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { OrderDetailsDemo } from '../order-details-demo';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService) {}

  lArrowIcon = faArrowAltCircleLeft;
  rArrowIcon = faArrowAltCircleRight;

  userDetailsForm:FormGroup;

  goBackTo(){
    this.router.navigate(['/order-summary'])
  }
  proceedToNext(){
    const orderDetails = new OrderDetailsDemo(
      this.userDetailsForm.controls.firstname.value,
      this.userDetailsForm.controls.lastname.value,
      this.userDetailsForm.controls.phone.value,
      this.userDetailsForm.controls.email.value
    )
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
    this.router.navigate(['/order-address']);
  }
  checkNum(control:FormControl): {[key:string]: boolean} {
    let phoneNumber = {'phone': String(control.value)};
    let phoneNumberLength = phoneNumber.phone.length;
    if(phoneNumberLength == 9){
    return null
    }
    else return {'Validation' : false}
  
  };


  ngOnInit(): void {
    if(this.auth.loggedIn()){
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      
      this.userDetailsForm = new FormGroup({
        'firstname' : new FormControl(loggedUser.firstname, [Validators.required, Validators.minLength(2)]),
        'lastname' : new FormControl(loggedUser.lastname, [Validators.required, Validators.minLength(2)]),
        'phone' : new FormControl(`0${loggedUser.phone}`, [Validators.required, this.checkNum]),
        'email' : new FormControl(loggedUser.email, [Validators.required, Validators.email])
      })
  }
  else{
    this.userDetailsForm = new FormGroup({
      'firstname' : new FormControl('', Validators.required),
      'lastname' : new FormControl('', Validators.required),
      'phone' : new FormControl('', Validators.required),
      'email' : new FormControl('', Validators.required)
    })
  }
  }

}
