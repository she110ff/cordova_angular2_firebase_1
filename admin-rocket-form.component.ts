/*

{
	"online": {
		"온라인": true,
		"오프라인": true,
		"온/오프라인": true
	},
	"activityLocation": {
		"서울": true,
		"경기": true,
		"제주": true
	},
	"activityBenefit": {
		"활동증명": true,
		"봉사인정": true,
		"활동비지급": true
	}
	"highflierBenefit": {
		"입사시가산점":  true,
		"포상": true
	}
	"meetingCycle": {
		"월1회": true,
		"월2회": true
	}
}


*/


import { Subscription } from "rxjs/Rx";
import 'rxjs/add/operator/take';
import { Component, Inject, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { NgModule } from '@angular/core';

@Component({
	selector: 'admin-rocket-form',
	templateUrl: 'admin-rocket-form.component.html'
})

export class AdminRocketFormComponent{
  	rockets: FirebaseListObservable<any[]>;

	activityLocations = null;
	cActivityLocations = null;
	firstLocation = null;

	activityBenefits = null;
	cActivityBenefits = null;
	firstBenefit = null;

	offlines= null;
	cOfflines= null;
	firstOffline = null;

	highflierBenefits = null;
	cHighflierBenefits = null;
	firstHighflierBenefit = null;

	meetingCycles = null;
	cMeetingCycles = null;
	firstMeetingCycle = null;

	constructor(public router: Router, private route: ActivatedRoute, public af: AngularFire) {

		this.rockets = af.database.list('/rockets');

		this.activityLocations = this.af.database.list('/activity-location');
		this.activityLocations.subscribe( activityLocations => { console.log("activityLocations :",activityLocations)
		 	this.cActivityLocations = activityLocations;
		 	this.firstLocation = activityLocations[0].$key;
		});
		this.activityBenefits = this.af.database.list('/activity-benefit');
		this.activityBenefits.subscribe( activityBenefits => { console.log("activityBenefits :",activityBenefits)
		 	this.cActivityBenefits = activityBenefits;
		 	this.firstBenefit = activityBenefits[0].$key;	
		});
		this.offlines = this.af.database.list('/offline');
		this.offlines.subscribe( offlines => { console.log("offlines :",offlines)
		 	this.cOfflines = offlines;
		 	this.firstOffline = offlines[0].$key;
		});
		this.highflierBenefits = this.af.database.list('/highflier-benefit');
		this.highflierBenefits.subscribe( highflierBenefits => { console.log("highflierBenefits :",highflierBenefits)
		 	this.cHighflierBenefits = highflierBenefits;
		 	this.firstHighflierBenefit = highflierBenefits[0].$key;
		});
		this.meetingCycles = this.af.database.list('/meeting-cycle');
		this.meetingCycles.subscribe( meetingCycles => { console.log("meetingCycles :",meetingCycles)
		 	this.cMeetingCycles = meetingCycles;
		 	this.firstMeetingCycle = meetingCycles[0].$key;
		});
	};

	cancel(){
		console.log("cancel");
	}

	addRocket(title:string, desc:string, recruit:string, host:string, quota:number, mimage:string, keywords:string,
				activityBenefit:string, activityLocation:string, highflierBenefit:string, meetingCycle:string ){
		const rocket = {title:title, desc:desc, recruit:recruit, host:host, quota:quota, mimage: mimage, keywords:keywords,
						activityBenefit:activityBenefit, activityLocaiton:activityLocation, highflierBenefit:highflierBenefit, meetingCycle:meetingCycle };
		console.log("saveRocket rocket:", rocket);
		this.rockets.push(rocket)
		.then(rocket => console.log("success for adding rocket" + rocket ))
		.catch(error => alert("failed for adding rocket"));
	}
}

