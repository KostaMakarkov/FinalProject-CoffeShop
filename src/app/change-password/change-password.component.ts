import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { PasswordChange } from '../password-change';
import { UserDemo } from '../user-demo';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }

  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new PasswordChange(
      this.changeForm.controls.password.value,
      this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editPassword(changedSetting).subscribe();
    window.location.reload()
  };

  checkPassword(control:FormControl): {[key:string]: boolean} {
    const letters =  /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    const password = control.value;
    if(password.match(letters)){
      return null
    }
    else return{'Validation' : false};
  };


  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(6), this.checkPassword])
    })
    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }

}
