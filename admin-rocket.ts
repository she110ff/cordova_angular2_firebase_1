/*
https://firebase.googleblog.com/2013/10/queries-part-1-common-sql-queries.html?utm_campaign=Firebase_featureoverview_education_database_en_11-18-16&utm_source=Firebase&utm_medium=yt-desc
https://github.com/angular/angularfire2/issues/144
https://github.com/angular/angularfire2/issues/380

https://embed.plnkr.co/?show=preview
*/

import { Subscription } from "rxjs/Rx";
import 'rxjs/add/operator/take';
import { Component, Inject, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <h4> Rocket List</h4>
    <ul>
      <li *ngFor="let rocket of rockets | async" >{{ rocket | json }}  
      <button  (click)="removeItemFromList( rocket.$key )">DEL</button>
      <button  (click)="setRocketIntoForm( rocket )">MOD</button>
    </li>
    </ul>

    <h4> Query Rocket List</h4>
    <ul>
      <li *ngFor="let rocket of queryObservable | async" > {{ rocket | json }} </li>
    </ul>


  <hr>

    <div *ngIf="rocket">
      <h2>Modify Rocket</h2>
      <div>
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" #modTitle required value="{{ rocket.title }}">
          </div>
          <div class="form-group">
            <label for="desc">Description</label>
            <input type="text" class="form-control" #modDesc value="{{ rocket.desc }}">
          </div>
          <div class="form-group" *ngIf="recruits">
            <label>Recruit</label>
            <select class="form-control"  #modRecruit (change)="callTypeForMod(modRecruit.value)" required>
              <option *ngFor="let recruit of nRec" [value]="recruit.$key" [selected]="recruit.$key === rocket.recruit">{{recruit.$key}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="host">Host</label>
            <input type="text" class="form-control"  #modHost value="{{ rocket.host }}">
          </div>
        </form>
          <button class="btn btn-cancel" (click)="cancelRocketModify()">Cancel</button>
          <button class="btn btn-success" (click)="modifyRocket(modTitle.value, modDesc.value, modRecruit, modHost.value)">Modify</button>
      </div>
    </div>

  <hr>
  <div> 
    <h2>Add Rocket</h2>

    <form>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" #newTitle placeholder="Title" /> 
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" #newDesc placeholder="desc" />
      </div>

      <div class="form-group" *ngIf="nRec">
        <label>Recruit</label>
        <select class="form-control" #newRecruit (change)="callTypeForAdd(newRecruit.value)"  required>
          <option *ngFor="let recruit of nRec" [value]="recruit.$key">{{recruit.$key}}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Host</label>
        <input type="text" class="form-control" #newHost placeholder="host" />
      </div>
    </form>
      <button (click)="addRocket(newTitle.value, newDesc.value, newRecruit, newHost.value)">Add</button>
   </div>
  </div>
  `
})

export class AdminRocketComponent {
  user: FirebaseObjectObservable<any>;
  rocket;
  rockets: FirebaseListObservable<any[]>;
  recruits: FirebaseListObservable<any[]>;
  queryObservable;
  nRec:Array<string> = null;
  selectedRecruitForAdd:string = '';
  selectedRecruitForMod:string = '';


  constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {
    this.rockets = af.database.list('/rockets');
    this.recruits = this.af.database.list('/recruits');

    this.recruits.subscribe( recruits => {
      console.log("recruits :",recruits)
      this.nRec = recruits;
    });
    this.queryObservable = this.af.database.list('/rockets', {
      query: {
        orderByChild: 'created',
        endAt:  new Date().getTime()
      }
    })
/*    .map(rockets => {
        return rockets.filter(rocket => rocket.host === 'H 1');
    })*/
    .map(rockets => {
        const filtered = rockets.filter(rocket => rocket.recruit === 'oversea');
        console.log('filtered length:', filtered.length);
        return filtered;
     });
  };

  addRocket(newTitle: string, newDesc:string, newRecruit:string, newHost:string) {
    let rocket = { "title": newTitle, "desc":newDesc, "recruit":this.selectedRecruitForAdd, "host": newHost, "created":new Date().getTime() };
    console.log("ADD rocket:", rocket);
/*
    var newPostKey = this.rockets.push(rocket)
    .then(rocket => console.log("success for adding rocket" + rocket ))
    .catch(error => alert("failed for adding rocket"));
    console.log(" var newPostKey = ", newPostKey);
    */
  }

  modifyRocket(newTitle: string, newDesc:string, newRecruit:string, newHost:string) {
    let rocket = { "title": newTitle, "desc":newDesc, "recruit":this.selectedRecruitForMod, "host": newHost, "created":new Date().getTime() };
    console.log("MOD rocket:", rocket);

  }

  removeItemFromList(key: string) {
    console.log("delete key:", key);
    if(key != undefined && key != null) this.rockets.remove(key).then(_ => console.log('rocket deleted!'));
  }

  setRocketIntoForm(rocket){
    console.log("key:", rocket.$key);
    console.log("setRocketIntoForm rocket:", rocket);
    this.rocket = rocket;
  }

  cancelRocketModify(){
    this.rocket = null;
  }

   callTypeForAdd(value){
    console.log(value);
     this.selectedRecruitForAdd = value;
  }

   callTypeForMod(value){
    console.log(value);
     this.selectedRecruitForMod = value;
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
  }

}
