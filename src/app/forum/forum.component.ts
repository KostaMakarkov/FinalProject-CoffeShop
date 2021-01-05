import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ForumDemo } from '../forum-demo';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private formBuilder:FormBuilder) {
    this.myForm = this.formBuilder.group({
      postId : [''],
      postEmail : ['', Validators.required],
      postTitle : ['', Validators.required],
      postBody : ['', Validators.required],
      postCreator : ['', Validators.required],
      postDate : ['', Validators.required],
    });
   };
   
   myForm;

  myForumArray:ForumDemo[]=[].reverse();
  oneForumPost:string;
  atmTime:string = Date()

  addNewPost(){
    const newPost= new ForumDemo(
      this.myForm.controls.postId = '',
      this.myForm.controls.postEmail.value,
      this.myForm.controls.postTitle.value,
      this.myForm.controls.postBody.value,
      this.myForm.controls.postCreator = 'admin',
      this.myForm.controls.postDate = this.atmTime
    );
    this.api.addNewPost(newPost).subscribe();
     
  }
  
  sendIdToForumContent(id){
    localStorage.setItem('postId', id);
    this.router.navigate(['forum-content']);
  }


  ngOnInit(): void {
    this.api.getAllForumPosts().subscribe(data => this.myForumArray=data);
  }

}
