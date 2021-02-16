import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressChange } from './address-change';
import { CommentDemo } from './comment-demo';
import { ContactUs } from './contact-us';
import { DobChange } from './dob-change';
import { ForumDemo } from './forum-demo';
import { LastnameChange } from './lastname-change';
import { MenuDemo } from './menu-demo';
import { Orderdemo } from './orderdemo';
import { Orderdetailsdemo } from './orderdetailsdemo';
import { PasswordChange } from './password-change';
import { PhoneChange } from './phone-change';
import { ReservationDemo } from './reservation-demo';
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
  serverUrlContact = environment.contactUsUrl;
  serverUrlReservations = environment.reservationsUrl;

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

  getAllComments():Observable<CommentDemo[]>{
    return this.http.get<CommentDemo[]>(this.serverUrlComments);
  };

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
  getSingleDish(dishId):Observable<MenuDemo>{
    return this.http.get<MenuDemo>(`${this.serverUrlMenu}/getSingleDish/${dishId}`);
  };
  addNewDish(dish):Observable<MenuDemo>{
    return this.http.post<MenuDemo>(this.serverUrlMenu, dish);
  }
  editDish(dish):Observable<MenuDemo>{
    return this.http.put<MenuDemo>(this.serverUrlMenu, dish);
  }
  deleteDish(dishId):Observable<string>{
    return this.http.delete<string>(`${this.serverUrlMenu}/${dishId}`);
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
  myOrderHistory(email):Observable<any>{
    return this.http.get<any[]>(`${this.serverUrlOrder}/get/orderSummary/${email}`)
  }
  allOrdersHistory():Observable<any[]>{
    return this.http.get<any[]>(this.serverUrlOrder);
  };

  //Users API//
  getAllUsers():Observable<UserDemo[]>{
    return this.http.get<UserDemo[]>(this.serverUrlUsers);
  }
  getUsersByPosition(position):Observable<UserDemo[]>{
    return this.http.get<UserDemo[]>(`${this.serverUrlUsers}/position/${position}`);
  }
  newUser(data):Observable<UserDemo>{
    return this.http.post<UserDemo>(this.serverUrlUsers, data);
  };
  getAllPositionUsers(position):Observable<UserDemo[]>{
    return this.http.get<UserDemo[]>(`${this.serverUrlUsers}/${position}`);
  };
  getUser(email):Observable<UserDemo>{
    return this.http.get<UserDemo>(`${this.serverUrlUsers}/user/${email}`);
  }
  getUserById(userId):Observable<UserDemo>{
    return this.http.get<UserDemo>(`${this.serverUrlUsers}/user/userId/${userId}`)
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
  editPosition(editData):Observable<any>{
    return this.http.put<any>(`${this.serverUrlUsers}/positionChange`, editData);
  };
  check():Observable<any>{
    return this.http.get<any>(`${this.serverUrlUsers}/checkCookie`);
  }

  //Contact-Us//
  sendEmail(email):Observable<ContactUs>{
    return this.http.post<ContactUs>(this.serverUrlContact, email)
  }

  //reservations//
  newReservation(reservations):Observable<ReservationDemo>{
    return this.http.post<ReservationDemo>(`${this.serverUrlReservations}/addReservation`, reservations);
  }

}
