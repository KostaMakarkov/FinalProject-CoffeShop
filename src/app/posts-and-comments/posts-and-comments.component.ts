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
  selector: 'app-posts-and-comments',
  templateUrl: './posts-and-comments.component.html',
  styleUrls: ['./posts-and-comments.component.css']
})
export class PostsAndCommentsComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthService, private router:Router, private checkUser:CheckuserService) { }

  myPostsArray:ForumDemo[]=[];
  myCommentsArray:CommentDemo[]=[];
  loggedUser:UserDemo;
  backIcon = faArrowAltCircleLeft;


  goBackTo(){
    this.router.navigate(['/']);
  }

  deletePost(id){
    console.log(id);
    this.api.deletePost(id).subscribe();
    this.api.deleteManyComments(id).subscribe();
    window.location.reload();
  }
  deleteComment(id){
    this.api.deleteComment(id).subscribe();
    window.location.reload();
  }

  getPostsAndCommentsFromServer(email){
    this.api.getAllUserForumPosts(email).subscribe(data => this.myPostsArray = data);
    this.api.getUserComments(email).subscribe(data => this.myCommentsArray = data);
  }


  ngOnInit(): void {
    if(this.auth.loggedIn()){
      const loggedParse = JSON.parse(localStorage.getItem('user'));
      const logged = loggedParse.email;
      this.api.getUser(logged).subscribe(data => {
        this.loggedUser = data;
        this.getPostsAndCommentsFromServer(logged);
      });
    }
    else{
      if(this.checkUser.getCurrentUser()){
        let fireUser; 
        this.checkUser.getCurrentUser().then(user => {
          fireUser = user;
          this.getPostsAndCommentsFromServer(fireUser.email);
          
        })
      }
    }
  }

}
