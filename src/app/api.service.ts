import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentDemo } from './comment-demo';
import { ForumDemo } from './forum-demo';
import { MenuDemo } from './menu-demo';
import { Orderdemo } from './orderdemo';
import { Orderdetailsdemo } from './orderdetailsdemo';
import { WantedDemo } from './wanted-demo';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  serverUrlForum = environment.forumUrl;
  serverUrlComments = environment.commentsUrl;
  serverUrlWanted = environment.wantedUrl;
  serverUrlMenu = environment.menuUrl;
  serverUrlOrder = environment.orderUrl;

  //Forum API//
  getAllForumPosts():Observable<ForumDemo[]>{
    return this.http.get<ForumDemo[]>(this.serverUrlForum);
  };
  getOneForumPost(id):Observable<ForumDemo>{ 
    return this.http.get<ForumDemo>(`${this.serverUrlForum}/${id}`);
  };
  getLimitedPostsFromForum():Observable<ForumDemo[]>{
    return this.http.get<ForumDemo[]>(`${this.serverUrlForum}/limited`);
  };
  addNewPost(data):Observable<ForumDemo>{
    return this.http.post<ForumDemo>(this.serverUrlForum, data);
  };


  //Forum Comments API//

  getPostComments(id):Observable<CommentDemo[]>{
    return this.http.get<CommentDemo[]>(`${this.serverUrlComments}/${id}`);
  };
  addPostComment(data):Observable<CommentDemo> {
    return this.http.post<CommentDemo>(this.serverUrlComments, data);
  };

  //Wanted API //

  getAllWantedPosts():Observable<WantedDemo[]>{
    return this.http.get<WantedDemo[]>(this.serverUrlWanted);
  };
  getOneWantedPost(id):Observable<WantedDemo>{ 
    return this.http.get<WantedDemo>(`${this.serverUrlWanted}/${id}`);
  };

  //Menu API//

  getAllMenuDishes():Observable<MenuDemo[]>{
    return this.http.get<MenuDemo[]>(this.serverUrlMenu);
  };
  getDishesByCategory(dishCategory):Observable<MenuDemo[]>{
    return this.http.get<MenuDemo[]>(`${this.serverUrlMenu}/${dishCategory}`);
  };


  //Order API//

  newOrder(data):Observable<Orderdemo[]>{
    return this.http.post<Orderdemo[]>(this.serverUrlOrder, data);
  };

}
