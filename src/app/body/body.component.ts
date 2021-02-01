import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ForumDemo } from '../forum-demo';
import { faCalendarAlt, faBriefcase, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../auth.service';
import { UserDemo } from '../user-demo';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private auth:AuthService) { }

  myLimitedForumPostsArray:ForumDemo[]=[];
  
  fbIcon = faFacebook;
  twIcon = faTwitter;
  inIcon = faInstagram;
  googleIcon = faGooglePlus;
  calendarIcon = faCalendarAlt;
  briefcaseIcon = faBriefcase;
  clockIcon = faClock;



  moveToForum(id){
    localStorage.setItem('postId', id)
    this.router.navigate(['/forum-content']);
  };
  moveMeTo(name){
    this.router.navigate([`/${name}`]); 
  }
  openPage(url: string){
    window.open(url, "_blank");
}


  ngOnInit(): void {
    this.api.getLimitedPostsFromForum().subscribe(data => {
      this.myLimitedForumPostsArray = data;
    });
    setInterval(() => {
    this.api.getLimitedPostsFromForum().subscribe(data => this.myLimitedForumPostsArray = data);
    }, 5500);
  }

}
