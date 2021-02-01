import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressChange } from './address-change';
import { CommentDemo } from './comment-demo';
import { DobChange } from './dob-change';
import { ForumDemo } from './forum-demo';
import { LastnameChange } from './lastname-change';
import { MenuDemo } from './menu-demo';
import { Orderdemo } from './orderdemo';
import { Orderdetailsdemo } from './orderdetailsdemo';
import { PasswordChange } from './password-change';
import { PhoneChange } from './phone-change';
import { UserDemo } from './user-demo';
import { UsernameChange } from './username-change';
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
  serverUrlUsers = environment.usersUrl;
  serverUrlmenuOrderingPrices = environment.menuOrderingPricesUrl;

  //Forum API//
  getAllForumPosts():Observable<ForumDemo[]>{
    return this.http.get<ForumDemo[]>(this.serverUrlForum);
  };
  getOneForumPost(id):Observable<ForumDemo>{ 
    return this.http.get<ForumDemo>(`${this.serverUrlForum}/forumPost/${id}`);
  };
  getAllUserForumPosts(email):Observable<ForumDemo[]>{ 
    return this.http.get<ForumDemo[]>(`${this.serverUrlForum}/userPost/${email}`);
  };
  getLimitedPostsFromForum():Observable<ForumDemo[]>{
    return this.http.get<ForumDemo[]>(`${this.serverUrlForum}/limited`);
  };
  addNewPost(data):Observable<ForumDemo>{
    return this.http.post<ForumDemo>(this.serverUrlForum, data);
  };
  deletePost(commentId):Observable<String>{
    return this.http.delete<string>(`${this.serverUrlForum}/${commentId}`);
  };

  //Forum Comments API//

  getPostComments(id):Observable<CommentDemo[]>{
    return this.http.get<CommentDemo[]>(`${this.serverUrlComments}/${id}`);
  };
  addPostComment(data):Observable<CommentDemo> {
    return this.http.post<CommentDemo>(this.serverUrlComments, data);
  };
  getUserComments(email):Observable<CommentDemo[]>{
    return this.http.get<CommentDemo[]>(`${this.serverUrlComments}/userComments/${email}`);
  };
  deleteComment(commentId):Observable<String>{
    return this.http.delete<string>(`${this.serverUrlComments}/${commentId}`);
  };
  deleteManyComments(byPostId):Observable<string>{
    return this.http.delete<string>(`${this.serverUrlComments}/deleteMany/${byPostId}`);
  }
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

  getCurrentOrders(orderIds):Observable<any>{
    return this.http.get<any[]>(`${this.serverUrlOrder}/${orderIds}`);
  }

  newOrder(data):Observable<Orderdemo[]>{
    return this.http.post<Orderdemo[]>(this.serverUrlOrder, data);
  };

  getMenuPriceIds():Observable<MenuDemo[]>{
    return this.http.get<MenuDemo[]>(this.serverUrlmenuOrderingPrices);
  }
  sendOrder(order):Observable<any[]>{
    return this.http.post<any[]>(`${this.serverUrlOrder}/orderSummary`, order);
  }

  //Users API//
  newUser(data):Observable<UserDemo>{
    return this.http.post<UserDemo>(this.serverUrlUsers, data);
  };
  getAllPositionUsers(position):Observable<UserDemo[]>{
    return this.http.get<UserDemo[]>(`${this.serverUrlUsers}/${position}`);
  };
  getUser(email):Observable<UserDemo>{
    return this.http.get<UserDemo>(`${this.serverUrlUsers}/user/${email}`);
  }
  editFirstname(editData):Observable<UsernameChange>{
    return this.http.put<UsernameChange>(this.serverUrlUsers, editData);
  };
  editLastname(editData):Observable<LastnameChange>{
    return this.http.put<LastnameChange>(this.serverUrlUsers, editData);
  };
  editPassword(editData):Observable<PasswordChange>{
    return this.http.put<PasswordChange>(`${this.serverUrlUsers}/password`, editData);
  };
  editDob(editData):Observable<DobChange>{
    return this.http.put<DobChange>(this.serverUrlUsers, editData);
  };
  editPhone(editData):Observable<PhoneChange>{
    return this.http.put<PhoneChange>(this.serverUrlUsers, editData);
  };
  editAddress(editAddress):Observable<AddressChange>{
    return this.http.put<AddressChange>(`${this.serverUrlUsers}/editAddress`, editAddress);
  }
  check():Observable<any>{
    return this.http.get<any>(`${this.serverUrlUsers}/checkCookie`);
  }

}
