import { Component, OnInit } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { LoginDemo } from '../login-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FirebaseAuthService } from '../firebase-auth.service';
import { CheckuserService } from '../checkuser.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api:ApiService, private router:Router, private auth:AuthService, private fireAuthService: FirebaseAuthService, private checkUser: CheckuserService) { }


  googleIcon = faGoogle;
  loginForm: FormGroup;
  errMsg:string = '';
  backIcon = faArrowAltCircleLeft;
  goBackTo(){
    this.router.navigate(['/']);
  }


  login(){
    const userSignIn = new LoginDemo(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    )
    if(this.loginForm.valid){
      this.auth.userLogin(userSignIn).subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user' , JSON.stringify(res.loggedUser))
        this.router.navigate(['/']);
      }, err => {
        if(err){
          this.errMsg = 'Email Or Password are Incorrect';
        };
      });
    }
    else{
      this.errMsg = 'All Fields Are Required!'
    }
  };

  loginWithGoogle(){
    this.fireAuthService.googleLogin().then(
      user => {
        this.router.navigate(['/']);
    })
  }

  ngOnInit(): void {
    const logged = this.auth.loggedIn();
    if(logged){
      this.router.navigate(['/user-settings']);
    }
    else{
      const fireLogged = this.checkUser.getCurrentUser();
      if(fireLogged){
        this.router.navigate(['/user-settings-fireGuard']);
      }
    }

    

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
  })
}

}
