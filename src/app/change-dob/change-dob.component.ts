import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DobChange } from '../dob-change';
import { UserDemo } from '../user-demo';

@Component({
  selector: 'app-change-dob',
  templateUrl: './change-dob.component.html',
  styleUrls: ['./change-dob.component.css']
})
export class ChangeDobComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService) { }

  changeForm:FormGroup;
  loggedUser:UserDemo;
  loggedEmail = '';
  doubleCheck = faCheckDouble;
  activateIcon = false;

  change(){
    const changedSetting = new DobChange(
      this.changeForm.controls.dateOfBirth.value,
      this.loggedEmail
    )
    this.activateIcon = true;
    this.api.editPhone(changedSetting).subscribe();
    window.location.reload()
  };

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      'dateOfBirth': new FormControl('', Validators.required)
    })
    const loggedParse = JSON.parse(localStorage.getItem('user'));
    const logged = loggedParse.email;
    this.loggedEmail = logged;
    if(this.auth.loggedIn()){
      this.api.getUser(logged).subscribe(data => this.loggedUser = data);
    };
  }

}
