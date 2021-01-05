import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { WantedDemo } from '../wanted-demo';

@Component({
  selector: 'app-wanted',
  templateUrl: './wanted.component.html',
  styleUrls: ['./wanted.component.css']
})
export class WantedComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  myWantedPostsArry:WantedDemo[]=[];

  moveToPost(id){
    localStorage.setItem('wantedId', id)
    this.router.navigate(['/wanted-post']);
  };

  ngOnInit(): void {
    this.api.getAllWantedPosts().subscribe(data => this.myWantedPostsArry = data);
  }

}
