import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UserDemo } from '../user-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { AddressDemo } from '../address-demo';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  registerForm: FormGroup;
  registeredUsersEmails=[];
  backIcon = faArrowAltCircleLeft;
  
  goBackTo(){
    this.router.navigate(['/']);
  }


  checkPassword(control:FormControl): {[key:string]: boolean} {
    const letters =  /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    const password = control.value;
    if(password.match(letters)){
      return null
    }
    else return{'Validation' : false};
  };

  checkname(control:FormControl): {[key:string]: boolean} {
    const firstname = control.value;
    const firstnameLength = firstname.length;
    if(firstnameLength > 1){
    return null
    }
    else return{'Validation' : false};
  };

  checkNum(control:FormControl): {[key:string]: boolean} {
    let phoneNumber = {'phone': String(control.value)};
    let phoneNumberLength = phoneNumber.phone.length;
    if(phoneNumberLength == 9){
    return null
    }
    else return {'Validation' : false}
  
  };

  checkEmailAvailability(control:FormControl): {[key:string]: boolean} {
    const enteredEmail = control.value;
    let result;
    this.registeredUsersEmails.forEach(ele => {
      if(enteredEmail == ele.email){
        result = {'Validation' : false}
       }
      if(enteredEmail != ele.email){
        result = null
      }
    })
    return result
  }

  onSubmit(){
    const Address = new AddressDemo(
      this.registerForm.controls.addressCity.value,
      this.registerForm.controls.addressStreet.value,
      this.registerForm.controls.addressApartment.value,
      this.registerForm.controls.addressZip.value,
    )
    const registerNewUser = new UserDemo(
      this.registerForm.controls.firstname.value,
      this.registerForm.controls.lastname.value,
      this.registerForm.controls.password.value,    
      this.registerForm.controls.email.value,   
      this.registerForm.controls.dateOfBirth.value,
      this.registerForm.controls.phone.value,
      Address,
      this.registerForm.controls.agree.value,
      this.registerForm.controls.position.value
    )
    this.api.newUser(registerNewUser).subscribe();
    this.router.navigate(['/login']);
  }


  ngOnInit() {
    this.api.getAllPositionUsers('user').subscribe(data => this.registeredUsersEmails = data);
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, this.checkEmailAvailability.bind(this)]),
      'password': new FormControl('', [Validators.required, this.checkPassword, Validators.minLength(6)]),
      'firstname': new FormControl('', [Validators.required, this.checkname]),
      'lastname': new FormControl('', [Validators.required, this.checkname]),
      'dateOfBirth': new FormControl('', Validators.required),
      'phone': new FormControl('', [Validators.required, this.checkNum]),
      'addressCity': new FormControl('', Validators.required),
      'addressStreet': new FormControl('', Validators.required),
      'addressApartment': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'addressZip': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      'agree': new FormControl(false, Validators.requiredTrue),
      'position': new FormControl('user')
    });
  };

}