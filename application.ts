import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    {{title}}
  </h1>
  <div>
    list
  </div>
  <div>
    <a [routerLink]="['profile']">profile</a>
  </div>
  <div> <a [routerLink]="['adminrocket']">admin rocket</a> </div>
  <router-outlet></router-outlet>
  `
})
export class ApplicationComponent {
  title = 'app works!';
  authState = null;

  constructor(public af: AngularFire) {

  }

}
