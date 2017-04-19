
/*

/signin?returnUrl=proflie
other page
1. throught the auth.gurard, go to signin with returnUrl

/signin
signin windwow
1. each social signin buttons
2. a button to goto signup

/signup
signup window
1. agreements of terms
2. social signup button

signin process
1. has a state
  1.1 has a 'users/$uid'
    1.1.1 yes : do signin
      1.1.1.1 has a returnUrl => move to the returnUrl 
      1.1.1.2 no returnUrl => move to the /rocket
    1.1.2 no : goto signup
2. no state
  2.1 stay in signin without moving

signup process
1. did agree on terms
  1.1 yes : store user data into the '/users' by uid key
    1.1.1 move to the second step, setting profile or cancle ( goto the /rocket) 
    1.1.2 move to the third step, setting noti_rocket filter
  1.2 no : alert for checking terms

*/

import { Component, Inject  } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseRef  } from 'angularfire2';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-root',
  template: `
  <div> {{ (af.auth | async)?.uid }} </div>
  <button (click)="login()">Login</button>
  <button (click)="logout()">Logout</button>
  <br>
  <button (click)="facebookLogin()">FaceBook Login</button>
 <a [routerLink]="['/signup']" [queryParams]="{debug: true}" fragment="education">
  signup
</a>
  `
})

export class LoginComponent {
  title:string = 'Login';
  param: string;

  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.af.auth.subscribe(state => {
      if(state){ this.procWithState(state); } 
      else { console.log("no state"); }
    });

    route.queryParams.subscribe(
        (queryParam: any) => { this.param = queryParam['returnUrl']; }
    );
    console.log('login param :', this.param);
  }

  procWithState(state){
    console.log('>> procWithState > state :', state);
    var uid = state.auth.uid;
        
    let item = this.af.database.object('/users/' + uid, { preserveSnapshot: true }).take(1);
    item.subscribe(snapshot => {
      let se =  snapshot.exists();
      console.log("snapshot exists", se);
      if(se){
        if(this.param) this.router.navigate([this.param]);
        else this.router.navigate(['/']);
      }
      else{ 
        this.af.auth.logout();
        this.router.navigate(['/signup']); 
      }
    });
  }

  procWithoutState(){
    console.log(">> procWithoutState");
  }

  login() {
    this.af.auth.login();
  }


  facebookLogin() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect,
    });
  }

  logout() {
     this.af.auth.logout();
  }
}
