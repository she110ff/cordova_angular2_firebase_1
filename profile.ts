import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';

@Component({
  //selector: 'app-root',
  template: `

  <div>
    profile page
  </div>

  `
})
export class ProfileComponent {
  title = 'Profile';

  constructor(public af: AngularFire) {

  }

}
