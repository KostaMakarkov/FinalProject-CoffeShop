import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ForumDemo } from '../forum-demo';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { CheckuserService } from '../checkuser.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  constructor(private api:ApiService, private router:Router, private auth:AuthService, private checkUser: CheckuserService) {}
   
  forumForm:FormGroup;
  loggedEmail:String = '';
  loggedUser;
  loggedUserName;
  backIcon = faArrowAltCircleLeft;


  myForumArray:ForumDemo[]=[];
  oneForumPost:string;
  atmTime:string = 'no time';

  addNewPost(){
    this.atmTime = Date();
    const newPost= new ForumDemo(
      this.forumForm.controls.postId.value,
      this.forumForm.controls.postEmail.value,
      this.forumForm.controls.postTitle.value,
      this.forumForm.controls.postContent.value,
      this.loggedUserName,
      this.atmTime
    );
    this.api.addNewPost(newPost).subscribe();
    window.location.reload()
  }
  
  sendIdToForumContent(id){
    localStorage.setItem('postId', id);
    this.router.navigate(['forum-content']);
  }

  goBackTo(){
    this.router.navigate(['/']);
  }


  ngOnInit(): void {
    this.api.getAllForumPosts().subscribe(data => {
      this.myForumArray=data
      this.myForumArray.reverse();
    });
    
    if(this.auth.loggedIn()){
      const loggedParse = JSON.parse(localStorage.getItem('user'));
      let logged = loggedParse.email;
      this.loggedEmail = logged;
      this.api.getUser(logged).subscribe(data => {
        this.loggedUser = data
        this.loggedUserName = `${this.loggedUser.firstname}`+` ${this.loggedUser.lastname}`;
      });
    }
    else{
      if(this.checkUser.getCurrentUser()){
        let fireLogged;
        this.checkUser.getCurrentUser().then(user => {
          fireLogged = user
          this.loggedUserName = fireLogged.displayName;
        });
        
      }
    }

    

    this.forumForm = new FormGroup({
      'postId': new FormControl(''),
      'postEmail': new FormControl('', [Validators.required, Validators.email]),
      'postTitle': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'postContent': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'postCreator': new FormControl(''),
      'postDate': new FormControl(this.atmTime),
      'addBtn': new FormControl('')
    })
  }

}

