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

  //Post and comments Arrays//
  myPostsArray:ForumDemo[]=[];
  myCommentsArray:CommentDemo[]=[];

  //Logged user Info//
  loggedUser:UserDemo;
  loggedUserEmail:any;

  //Icon//
  backIcon = faArrowAltCircleLeft;

  //Admin Identification//
  adminIsLogged:boolean = false;


  goBackTo(){
    this.router.navigate(['/']);
  }

  changeList(value: string){
    if(value == 'all'){
      this.api.getAllForumPosts().subscribe(data => this.myPostsArray = data);
      this.api.getAllComments().subscribe(data => this.myCommentsArray = data);
    }
    if(value == 'onlymy'){
      this.api.getAllUserForumPosts(this.loggedUserEmail).subscribe(data => this.myPostsArray = data);
      this.api.getUserComments(this.loggedUserEmail).subscribe(data => this.myCommentsArray = data);
    }
    else{
      this.myCommentsArray = [];
      this.myPostsArray = [];
    }
    
  }

  deletePost(id){
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
      const userId = localStorage.getItem('loggedId');
      this.api.getUserById(userId).subscribe( (data) => {
        this.loggedUser = data;
        this.loggedUserEmail = this.loggedUser.email;
        this.getPostsAndCommentsFromServer(this.loggedUserEmail);
        if(this.loggedUser.position == 'Admin' || this.loggedUser.position == 'Manager'){
          this.adminIsLogged = true;
        }
      })
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
