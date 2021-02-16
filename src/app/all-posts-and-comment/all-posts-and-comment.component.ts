import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CommentDemo } from '../comment-demo';
import { ForumDemo } from '../forum-demo';
import { UserDemo } from '../user-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { CheckuserService } from '../checkuser.service';

@Component({
  selector: 'app-all-posts-and-comment',
  templateUrl: './all-posts-and-comment.component.html',
  styleUrls: ['./all-posts-and-comment.component.css']
})
export class AllPostsAndCommentComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService, private router:Router, private checkUser:CheckuserService) { }

  myPostsArray:ForumDemo[]=[];
  myCommentsArray:CommentDemo[]=[];
  loggedUser:UserDemo;
  backIcon = faArrowAltCircleLeft;

  goBackTo(){
    this.router.navigate(['/']);
  };


  deletePost(id){
    console.log(id);
    this.api.deletePost(id).subscribe();
    this.api.deleteManyComments(id).subscribe();
    window.location.reload();
  };
  deleteComment(id){
    this.api.deleteComment(id).subscribe();
    window.location.reload();
  };

  getPostsAndCommentsFromServer(){
    this.api.getAllForumPosts().subscribe((data) => {
      this.myPostsArray = data
    });
    this.api.getAllComments().subscribe((data) => {
      this.myCommentsArray = data
    });
  };


  ngOnInit(): void {
    if(this.auth.loggedIn()){
      const loggedParse = JSON.parse(localStorage.getItem('user'));
      const logged = loggedParse.email;
      this.api.getUser(logged).subscribe(data => {
        this.loggedUser = data;
        this.getPostsAndCommentsFromServer();
      });
    }
    else{
      if(this.checkUser.getCurrentUser()){
        let fireUser; 
        this.checkUser.getCurrentUser().then(user => {
          fireUser = user;
          this.getPostsAndCommentsFromServer();
          
        });
      };
    };
  };
};
