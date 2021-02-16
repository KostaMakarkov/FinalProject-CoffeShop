import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommentDemo } from '../comment-demo';
import { ForumDemo } from '../forum-demo';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckuserService } from '../checkuser.service';


@Component({
  selector: 'app-forum-content',
  templateUrl: './forum-content.component.html',
  styleUrls: ['./forum-content.component.css']
})
export class ForumContentComponent implements OnInit {

  constructor(private api:ApiService, private formBuilder:FormBuilder, private router:Router, private auth:AuthService, private checkUser:CheckuserService) {};

  commentForm:FormGroup;

  myForumPost:ForumDemo;
  myForumComments:CommentDemo[]=[];
  backIcon = faArrowAltCircleLeft;

  postID= localStorage.getItem('postId');

  atmTime:string = 'No Time'
  msg:string;
  loggedEmail:string = '';
  loggedUser:UserDemo;

  showAddComment:boolean = false;
  



  addNewComment(){
    this.atmTime = Date();
    const newComment= new CommentDemo(
      this.postID,
      this.commentForm.controls.commentBody.value,
      this.loggedEmail,
      this.commentForm.controls.commentEmail.value,
      this.atmTime
    )
      this.api.addPostComment(newComment).subscribe();
      this.msg='Comment Added'
      window.location.reload()
      
  }

  goBackTo(){
    this.router.navigate(['/forum']);
  }



  ngOnInit(): void {

    const loggedId = localStorage.getItem('loggedId');
    if(loggedId){
      this.showAddComment = true;
    }
    if(this.checkUser.getCurrentUser()){
      let loggedFireUser;  
      this.checkUser.getCurrentUser().then( (user) => {
        loggedFireUser = user;
        if(loggedFireUser != null){
          this.showAddComment = true;
        };
      });
    };

    

    this.commentForm = new FormGroup({
      'postId': new FormControl(''),
      'commentBody': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'commentCreator': new FormControl(''),
      'commentEmail': new FormControl('', [Validators.required, Validators.email]),
      'commentDate': new FormControl(''),
    })

    const local = localStorage.getItem('postId')
    if(local == null){
      this.router.navigate(['/forum'])
    }
    else{
      const tempPostId = localStorage.getItem('postId');
      this.api.getOneForumPost(tempPostId).subscribe(data => this.myForumPost= data);
      this.api.getPostComments(tempPostId).subscribe(data => this.myForumComments= data);
      localStorage.removeItem('postId');
    }

  }
}