import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CheckuserService } from './checkuser.service';
import { FirebaseAuthService } from './firebase-auth.service';


@Injectable({
  providedIn: 'root'
})
export class FireAuthGuard implements CanActivate {
  constructor(private afAuth: FirebaseAuthService, private router:Router, private checkUser: CheckuserService){}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>{
    
    return new Promise(
      (resolve, reject) => {
        this.checkUser.getCurrentUser().then(user => {
          if(user){
            return resolve(true);
          }
          else{
            this.router.navigate(['/login']);
            return resolve(false);
          }
        })
      }
    )
    
  }
  
}
