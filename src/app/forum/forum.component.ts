import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ForumDemo } from '../forum-demo';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';
import { CheckuserService } from '../checkuser.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  constructor(private api:ApiService, private router:Router, private auth:AuthService, private checkUser: CheckuserService) {}
  
  //Icons //
  backIcon = faArrowAltCircleLeft;  

  //Forum //
  forumForm:FormGroup;
  myForumArray=[];
  oneForumPost:string;

  //Post details//
  loggedUserName = '';
  atmTime:string = 'no time';


  //Logged user validation//
  isUserLogged:boolean = false;
  loggedUser:UserDemo;







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
    const loggedId = localStorage.getItem('loggedId');
    if(loggedId){
      this.isUserLogged = true;
      this.api.getUserById(loggedId).subscribe( (data) => {
        this.loggedUser = data;
        this.loggedUserName = `${this.loggedUser.firstname}`+` ${this.loggedUser.lastname}`;
      });
    }
    if(this.checkUser.getCurrentUser()){
      this.checkUser.getCurrentUser().then( (user:any) => {
        const fireLogged = user;
        if(fireLogged){
          this.isUserLogged = true;
          this.loggedUserName = fireLogged.displayName;
        }
        
      });
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

