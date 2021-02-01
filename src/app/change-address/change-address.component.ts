import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { UserDemo } from '../user-demo';
import { AddressChange } from '../address-change';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }


  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new AddressChange(
        this.changeForm.controls.addressCity.value,
        this.changeForm.controls.addressStreet.value,
        this.changeForm.controls.addressApartment.value,
        this.changeForm.controls.addressZip.value,
        this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editAddress(changedSetting).subscribe();
    window.location.reload()
  }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'addressCity': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'addressStreet': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'addressApartment': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'addressZip': new FormControl('', [Validators.required, Validators.minLength(2)])
    })

    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }
}
