import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { UsernameChange } from '../username-change';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-firstname',
  templateUrl: './change-firstname.component.html',
  styleUrls: ['./change-firstname.component.css']
})
export class ChangeFirstnameComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }

  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new UsernameChange(
      this.changeForm.controls.firstname.value,
      this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editFirstname(changedSetting).subscribe();
    window.location.reload()
  }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required, Validators.minLength(2)])
    })

    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }

}
