import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { LastnameChange } from '../lastname-change';
import { UserDemo } from '../user-demo';

@Component({
  selector: 'app-change-lastname',
  templateUrl: './change-lastname.component.html',
  styleUrls: ['./change-lastname.component.css']
})
export class ChangeLastnameComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }

  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new LastnameChange(
      this.changeForm.controls.lastname.value,
      this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editLastname(changedSetting).subscribe();
    window.location.reload()
  }

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'lastname': new FormControl('', Validators.required)
    })
    
    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }

}
