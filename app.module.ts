import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { ApplicationComponent } from './components/application';
import { LoginComponent } from './components/login';
import { SignupComponent } from './components/signup';
import { SecondstepComponent } from './components/secondstep';
import { AdminRocketComponent } from './components/admin-rocket';
import { ProfileComponent } from './components/profile';
import { AuthGuard } from './shared/auth.guard';

const myFirebaseConfig = {
    apiKey: "AIzaSyBG7jDrEojeXsFksQYwY-Ufn2IYu3LFAiM",
    authDomain: "fb-host-test-ys.firebaseapp.com",
    databaseURL: "https://fb-host-test-ys.firebaseio.com",
    projectId: "fb-host-test-ys",
    storageBucket: "fb-host-test-ys.appspot.com",
    messagingSenderId: "666743166387"
  };

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      
      //{path: '', component: ApplicationComponent},
      {path: 'adminrocket', component: AdminRocketComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'secondstep', component: SecondstepComponent},
      {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    ]),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig, 'my-app-name')
  ],
  declarations: [
    ApplicationComponent,
    LoginComponent,
    SignupComponent,
    SecondstepComponent,
    AdminRocketComponent,
    ProfileComponent,
  ],
  providers: [
     AuthGuard
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
