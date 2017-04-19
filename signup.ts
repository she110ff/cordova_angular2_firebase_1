
/*

/signup
signup window
1. agreements of terms
2. social signup button

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
  <div> check term 1 </div>
  <div> check term 2 </div>
  <br>
  <button (click)="googleSignup()">Google Signup</button>
  <br>
  <button (click)="facebookSignup()">FaceBook Signup</button>
  `
})

export class SignupComponent {
  title:string = 'Signup';
  step: string;

  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.af.auth.subscribe(state => {
      console.log("Signup >> state:", state);
/*
      */
      if(state){
        var uid = state.auth.uid;
        let item = this.af.database.object('/users/' + uid, { preserveSnapshot: true });
        item.subscribe(snapshot => {
          let se =  snapshot.exists();
          console.log("snapshot exists", se);
          if(se){
            this.router.navigate(['/secondstep']);
          }
          else {
            var diaplayName = state.auth.displayName;
            var email = state.auth.email;
            var photoURL = state.auth.photoURL;
            const itemObservable = af.database.object('/users/'+ uid);
            itemObservable.set({ diaplayName: diaplayName, email: email, photoURL: photoURL });
          }
        });
      };
    });
  };



  googleSignup() {
    this.af.auth.login();
  }


  facebookSignup() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect,
    });
  }

}
