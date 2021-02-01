import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { PhoneChange } from '../phone-change';
import { UserDemo } from '../user-demo';


@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }

  
  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new PhoneChange(
      this.changeForm.controls.phone.value,
      this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editPhone(changedSetting).subscribe();
    window.location.reload()
  };

  checkNum(control:FormControl): {[key:string]: boolean} {
    let phoneNumber = {'phone': String(control.value)};
    let phoneNumberLength = phoneNumber.phone.length;
    if(phoneNumberLength == 9){
    return null
    }
    else return {'Validation' : false}
  
  };

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'phone': new FormControl('', [Validators.required, this.checkNum])
    })
    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }

}
