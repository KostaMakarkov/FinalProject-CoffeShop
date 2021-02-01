import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationDemo } from '../reservation-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private router:Router) { }

  reservationForm:FormGroup;
  backIcon = faArrowAltCircleLeft;

  checkNum(control:FormControl): {[key:string]: boolean} {
    let phoneNumber = {'phone': String(control.value)};
    let phoneNumberLength = phoneNumber.phone.length;
    if(phoneNumberLength == 9){
    return null
    }
    else return {'Validation' : false}
  
  };

  goBackTo(){
    this.router.navigate(['/']);
  }

  sendReservation(){
    const newReservation = new ReservationDemo(
      this.reservationForm.controls.reservationId.value,
      this.reservationForm.controls.reservationName.value,
      this.reservationForm.controls.reservationContactNumber.value,    
      this.reservationForm.controls.reservationCapacity.value,   
      this.reservationForm.controls.reservationDate.value,
    );
    console.log(newReservation);
  };

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      'reservationId' : new FormControl(''),
      'reservationName' : new FormControl('', [Validators.required, Validators.minLength(2)]),
      'reservationContactNumber' : new FormControl('', [Validators.required, this.checkNum]),
      'reservationCapacity' : new FormControl('', [Validators.required, Validators.min(2)]),
      'reservationDate' : new FormControl('', Validators.required)
    });

  };

}
