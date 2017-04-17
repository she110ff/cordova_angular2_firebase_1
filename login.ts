import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";


@Component({
  selector: 'app-root',
  template: `

  <div> {{ (af.auth | async)?.uid }} </div>
  <button (click)="login()">Login</button>
  <button (click)="logout()">Logout</button>
  <br>
  <button (click)="facebookLogin()">FaceBook Login</button>
  `
})
export class LoginComponent {
  title = 'Login';
  authState = null;

  private subscription: Subscription;

  param: string;


  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.af.auth.subscribe(state => {
      console.log('login :', state);
      this.authState = state;


          this.subscription = route.queryParams.subscribe(
              (queryParam: any) => {
                this.param = queryParam['returnUrl'];
                if(this.param)
                  this.router.navigate([this.param]);
              }
          );
          console.log('login param :', this.param);


      // state.auth.updateProfile({
      //   displayName: 'display name s',
      //   photoURL: "https://example.com/jane-q-user/profile.jpg"
      // }).then(() => {
      //   console.log("state 2 :", state);
      // });
    });

            //this.router.navigate(['/profile']);


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
