
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

  https://firebase.googleblog.com/2013/10/queries-part-1-common-sql-queries.html?utm_campaign=Firebase_featureoverview_education_database_en_11-18-16&utm_source=Firebase&utm_medium=yt-desc

https://github.com/angular/angularfire2/issues/144

https://github.com/angular/angularfire2/issues/380
*/


import { Component, Inject  } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <h4>Add Rocket</h4>
    
    <ul>
      <li *ngFor="let rocket of rockets | async">
         {{ rocket | json }}
      </li>
    </ul>

    <input type="text" #newTitle placeholder="Title" />
    <br/>
    <input type="text" #newDesc placeholder="desc" />
    <br/> 
    <button (click)="addRocket(newTitle.value, newDesc.value)">Add</button>
  </div>
  `
})

export class AdminRocketComponent {
  title:string = 'AdminRocket';
  step: string;
  user: FirebaseObjectObservable<any>;
  rockets: FirebaseListObservable<any[]>;

  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.rockets = af.database.list('/rockets');
    this.af.auth.subscribe(state => {
      console.log("Secondstep >> state:", state);
      if(state){
        //this.user = this.af.database.object('/users/'+state.auth.uid);
      };
    });
  };

  addRocket(newTitle: string, newDesc:string) {
    this.rockets.push({ title: newTitle, desc:newDesc });
  }


}
