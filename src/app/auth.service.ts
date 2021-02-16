import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginDemo } from './login-demo';
import { UserDemo } from './user-demo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  userLogin(user:LoginDemo):any{
    return this.http.post<LoginDemo>(`${environment.usersUrl}/login`, user);
  };

  registerUser(newUser:UserDemo){
    return this.http.post<UserDemo>(`${environment.usersUrl}`, newUser);
  };

  signOut():any{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedId');
    this.router.navigate(['/']);
  };

  getToken(){
    return localStorage.getItem('token');
  };

  loggedIn(){
    return !!localStorage.getItem('token');
  };

}
