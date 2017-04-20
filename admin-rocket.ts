
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <h4> Rocket List</h4>
    
    <ul>
      <li *ngFor="let rocket of rockets | async">
         {{ rocket | json }}
      </li>
    </ul>

    <h4> Query Rocket List</h4>
    
    <ul>
      <li *ngFor="let rocket of queryObservable | async">
         {{ rocket | json }}
      </li>
    </ul>


    <input type="text" #newTitle placeholder="Title" />
    <br/>
    <input type="text" #newDesc placeholder="desc" />
    <br/> 
    /*<input type="text" #newRecruit placeholder="recruit" />*/

     <select class="form-control" [(ngModel)]="newRecruit" (ngModelChange)="updateWorkout($event)">
        <option *ngFor="#recruit of recruits">{{recruit.key}}</option>
    </select>

    <br/> 
    <input type="text" #newHost placeholder="host" />
    <br/> 
    <button (click)="addRocket(newTitle.value, newDesc.value, newRecruit.value, newHost.value)">Add</button>
  </div>
  `
})

export class AdminRocketComponent {
  title:string = 'AdminRocket';
  step: string;
  user: FirebaseObjectObservable<any>;
  rockets: FirebaseListObservable<any[]>;
  recruits: FirebaseListObservable<any[]>;
  queryObservable;

  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.rockets = af.database.list('/rockets');


    this.af.auth.subscribe(state => {
      console.log("Secondstep >> state:", state);
      if(state){
        //this.user = this.af.database.object('/users/'+state.auth.uid);
      };
    });

    this.recruits = this.af.database.list('/recruits');
    this.recruits.subscribe( recruits => console.log("recruits :",recruits));

    this.queryObservable = this.af.database.list('/rockets', {
      query: {
        orderByChild: 'created',
        endAt:  new Date().getTime()
      }
    }).map(rockets => {
        return rockets.filter(rocket => rocket.host === 'H 1');
     }).map(rockets => {
        const filtered = rockets.filter(rocket => rocket.recruit === 'R3');
        console.log('filtered length:', filtered.length);
        return filtered;
     });
  };


  addRocket(newTitle: string, newDesc:string, newRecruit:string, newHost:string) {
    let rocket = { title: newTitle, desc:newDesc, recruit:newRecruit, host: newHost, created:new Date().getTime() };
    console.log("add rocket:", rocket);
    this.rockets.push(rocket)
    .then(rocket => console.log("success for adding rocket" + rocket ))
    .catch(error => alert("failed for adding rocket"));
  }

  searchRocket(){
     this.queryObservable = this.af.database.list('/rockets', {
      query: {
        orderByChild: 'created',
        endAt:  new Date().getTime()
      }
    });

   this.queryObservable.subscribe(queriedItems => {
      console.log("queriedItems:", queriedItems);  
      return queriedItems.filter(rocket => {
        console.log("rocket :", rocket);
        return rocket.host == 'H 1';
      })
    }); 
 /*
    var allItems = this.af.database.list('rockets');

    function getFilteredList(property:string, key:string) {
      return queryObservable.filter(item  => {
          return item[property] == key;
       });
    }*/
  }


}
