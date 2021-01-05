import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommentDemo } from '../comment-demo';
import { ForumDemo } from '../forum-demo';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-content',
  templateUrl: './forum-content.component.html',
  styleUrls: ['./forum-content.component.css']
})
export class ForumContentComponent implements OnInit {

  constructor(private api:ApiService, private formBuilder:FormBuilder, private router:Router) {
    this.myForm = this.formBuilder.group({
      postId : [''],
      commentEmail : ['', Validators.required],
      commentBody : ['', Validators.required],
      commentCreator : ['', Validators.required],
      commentDate : ['', Validators.required],
    })
   };

  myForm;
  pageLoad:boolean=false;
  myForumPost:ForumDemo;
  myForumComments:CommentDemo[]=[];
  tempId= localStorage.getItem('postId');
  atmTime:string = Date()
  msg:string;



  addNewComment(){
    const newComment= new CommentDemo(
      this.myForm.controls.postId = this.tempId,
      this.myForm.controls.commentBody.value,
      this.myForm.controls.commentCreator = 'Jesus',
      this.myForm.controls.commentEmail.value,
      this.myForm.controls.commentDate = this.atmTime
    )
      this.api.addPostComment(newComment).subscribe();
      this.msg='Comment Added'
      window.location.reload()
  }


  ngOnInit(): void {
    const local = localStorage.getItem('postId')
    if(local == null){
      this.router.navigate(['/forum'])
    }
    else{
      const tempPostId = localStorage.getItem('postId');
      this.api.getOneForumPost(tempPostId).subscribe(data => this.myForumPost= data);
      this.api.getPostComments(tempPostId).subscribe(data => this.myForumComments= data);
      localStorage.clear();
    }
    

  }

}
