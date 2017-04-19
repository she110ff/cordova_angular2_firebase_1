
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
import { AngularFire, AuthProviders, AuthMethods, FirebaseRef, FirebaseObjectObservable  } from 'angularfire2';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  template: `
  <div *ngIf='user'>
    <h4>email : {{ email}}</h4>
    <p><img src="{{ photoURL}}" /></p>
    <input type="text" #displyName placeholder="Name" value="{{ displayName}}"/>
    <input type="text" #newsize placeholder="Size" />
  </div>
  `
})

export class SecondstepComponent {
  title:string = 'Secondstep';
  step: string;
  user: FirebaseObjectObservable<any>;
  uid: string = '';
  email: string = '';
  displayName: string = '';
  photoURL:string = '';

  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.af.auth.subscribe(state => {
      console.log("Secondstep >> state:", state);
      if(state){
        this.uid = state.auth.uid;
        this.displayName = state.auth.displayName;
        this.email = state.auth.email;
        this.photoURL = state.auth.photoURL;
        this.user = this.af.database.object('/users/'+state.auth.uid);
      };
    });
  };



}
