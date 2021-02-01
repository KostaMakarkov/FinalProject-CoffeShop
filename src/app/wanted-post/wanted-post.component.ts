import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { WantedDemo } from '../wanted-demo';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CandidateDemo } from '../candidate-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-wanted-post',
  templateUrl: './wanted-post.component.html',
  styleUrls: ['./wanted-post.component.css']
})
export class WantedPostComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private formBuilder:FormBuilder) {};

  myWantedPost:WantedDemo;
  wantedPostForm:FormGroup;
  atmTime:string = Date();
  backIcon = faArrowAltCircleLeft;

  goBackTo(){
    this.router.navigate(['/wanted']);
  }
  
  sendApplication(){
    const newApplication= new CandidateDemo(
      this.myWantedPost[0].wantedPosition,
      this.wantedPostForm.controls.candidateEmail.value,
      this.wantedPostForm.controls.candidateName.value,
      this.wantedPostForm.controls.candidatePhone.value,
      this.wantedPostForm.controls.candidateResnume.value,
      this.atmTime
    );
    console.log(newApplication);
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

    this.wantedPostForm = new FormGroup({
      'wantedPosition': new FormControl(''),
      'candidateEmail': new FormControl('', [Validators.required, Validators.email]),
      'candidateName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'candidatePhone': new FormControl('', [Validators.required, this.checkNum]),
      'candidateResnume': new FormControl(''),
      'date': new FormControl('',)
    })

    const local = localStorage.getItem('wantedId');
    if(local == null){
      this.router.navigate(['/wanted']);
    }
    else{
      const tempId = localStorage.getItem('wantedId');
      this.api.getOneWantedPost(tempId).subscribe(data => this.myWantedPost = data);
      localStorage.clear();
    };
  };

};
