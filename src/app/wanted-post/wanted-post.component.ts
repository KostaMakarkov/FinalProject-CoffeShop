import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { WantedDemo } from '../wanted-demo';
import { FormBuilder, Validators } from '@angular/forms';
import { CandidateDemo } from '../candidate-demo';

@Component({
  selector: 'app-wanted-post',
  templateUrl: './wanted-post.component.html',
  styleUrls: ['./wanted-post.component.css']
})
export class WantedPostComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private formBuilder:FormBuilder) { 
    this.myForm = this.formBuilder.group({
      candidateEmail : ['', Validators.required],
      candidateName : ['', Validators.required],
      candidatePhone : ['', Validators.required],
      candidateResnume : ['', Validators.required],
      candidateDate : ['', Validators.required]
    });
  };

  myWantedPost:WantedDemo;
  myForm;
  atmTime:string = Date();
  
  sendApplication(){
    const newApplication= new CandidateDemo(
      this.myForm.controls.candidatePosition = this.myWantedPost[0].wantedPosition,
      this.myForm.controls.candidateEmail.value,
      this.myForm.controls.candidateName.value,
      this.myForm.controls.candidatePhone.value,
      this.myForm.controls.candidateResnume = 'value',
      this.myForm.controls.candidateDate = this.atmTime
    );
    console.log(newApplication);
  };


  ngOnInit(): void {
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
