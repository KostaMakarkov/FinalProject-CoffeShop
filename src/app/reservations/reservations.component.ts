import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationDemo } from '../reservation-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private router:Router, private api:ApiService) { }

  reservationForm:FormGroup;
  backIcon = faArrowAltCircleLeft;
  msg:string = '';

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
    const newReservationReq = new ReservationDemo(
      this.reservationForm.controls.reservationName.value,
      this.reservationForm.controls.reservationContactNumber.value,
      this.reservationForm.controls.reservationCapacity.value,
      this.reservationForm.controls.reservationDate.value
    )
    this.api.newReservation(newReservationReq).subscribe();
    this.msg = 'Reservation Send!';
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      'reservationName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'reservationContactNumber': new FormControl('', [Validators.required, this.checkNum]),
      'reservationCapacity': new FormControl('', [Validators.required, Validators.min(2)]),
      'reservationDate': new FormControl('', Validators.required)
    });

  };

}
