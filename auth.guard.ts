import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public router: Router, public af: AngularFire) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.auth.map((auth) =>  {
      if(auth == null) {
        this.router.navigate(['/login'], { queryParams: {returnUrl:state.url} });
        return false;
      } else {
        console.log("Guard > auth :", auth);
        return true;
      }
    }).first()
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}
