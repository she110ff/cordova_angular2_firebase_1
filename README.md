
## Note

Cordova(iOS, Android), Angular2, Firebase with FMC



## Prerequisites

Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together
with NPM 3 or higher. [Node.js install](https://nodejs.org/ko/download/)



## Table of Contents

* [Angular CLI Install](#angular-cli-intstall)
* [Usage](#usage)
* [Generating a New Project](#generating-and-serving-an-angular-project-via-a-development-server)
* [Generating Components, Directives, Pipes and Services](#generating-components-directives-pipes-and-services)
* [Updating Angular CLI](#updating-angular-cli)
* [Development Hints for working on Angular CLI](#development-hints-for-working-on-angular-cli)
* [Documentation](#documentation)
* [License](#license)



## Angular CLI - Install
### 0. Prerequisites

Before you start installing AngularFire2, make sure you have latest version of angular-cli installed.
To verify run the command `ng -v` and ensure you see `angular-cli: 1.x.x-beta.xx`. The lowest compatible version is `1.x.x-beta.14`.

If not, you may need to do the following:

```bash
# if you have the wrong cli version only
npm uninstall -g angular-cli
npm uninstall -g @angular/cli
npm cache clean

# reinstall clean version
npm install -g @angular/cli@latest
```

You need the Angular CLI, typings, and TypeScript.

```bash
npm install -g @angular/cli@latest
# or install locally
npm install @angular/cli --save-dev
# make sure you have typings installed
npm install -g typings
npm install -g typescript
```


### 1. Create a new project

```bash
ng new <project-name>
cd <project-name>
```

The Angular CLI's `new` command will set up the latest Angular build in a new project structure.

### 2. Test your Setup

```bash
ng serve
open http://localhost:4200
```

You should see a message that says *App works!*


## AngularFire2 - Install
### 3. Install AngularFire 2 and Firebase

```bash
npm install angularfire2 firebase --save
```

Now that you have a new project setup, install AngularFire2 and Firebase from npm.



## AngularFire2 - Setup 
### 4. Setup @NgModule

Open `/src/app/app.module.ts`, inject the Firebase providers, and specify your Firebase configuration.
This can be found in your project at [the Firebase Console](https://console.firebase.google.com):

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

```

#### Authentication and Custom FirebaseApp Names
You can optionally provide a custom FirebaseApp name with `initializeApp`.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const myFirebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig, 'my-app-name')
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```


## AngularFire Injectable


### 5. Inject AngularFire

Open `/src/app/app.component.ts`, and make sure to modify/delete any tests to get the sample working (tests are still important, you know):

```ts
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(af: AngularFire) {

  }
}

```

### 6. Bind to a list

In `/src/app/app.component.ts`:

```ts
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
}
```

Open `/src/app/app.component.html`:

```html
<ul>
  <li class="text" *ngFor="let item of items | async">
    {{item.$value}}
  </li>
</ul>
```

### 7. Run your app

```bash
ng serve
```



## Cordova CLI - Install   
https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
###  8. Cordova Install
Then we can install the `cordova-cli` package using NPM:
```bash
npm install -g cordova
```



## Cordova - Create Project 
https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
###  9. Creating an Apache Cordova project

``` bash
 $ cd <project_folder>
 $ cordova create cordova com.example.news "CompanyNews"
 Creating a new cordova project.
 $ tree -L 1 cordova
 cordova/
├── config.xml
├── hooks
├── platforms
├── plugins
└── www
```

###  10. Add Web Platfom

```bash
cd cordova
cordova platform add browser
cordova run browser
```

###  11. Build angular2 for Cordova 

```bash
rm -r www
cd ..
ng build --target=production --environment=prod --output-path cordova/www/
cd cordova
cordova run browser
```

### 12. Automatic builds

The Apache Cordova build process can be extended by using hooks. This is quite useful to inject our Angular 2 build process. For this task we are going to create a new directory scripts in the base directory of the Cordova project. Inside the directory we will have to create a script that takes care of the build process. Let's call this file prepareAngular2App.js.

```bash
touch scripts/prepareAngular2App.js
```


```js
const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function(context) {
    console.log('Building Angular 2 application into "./www" directory.');
    const basePath = context.opts.projectRoot;
    const baseWWW = basePath + '/www';

    console.log(execSync(
      "ng build --target=production --environment=prod --output-path cordova/www/ --base-href .",
      {
        maxBuffer: 1024*1024,
        cwd: basePath + '/..'
      }).toString('utf8')
    );
    
    var files = fs.readdirSync(baseWWW);
    for (var i = 0; i < files.length; i++) {
      if (files[i].endsWith('.gz')) {
        fs.unlinkSync(baseWWW + '/' + files[i]);
      }
    }    
};
```

Here we run the angular-cli build process synchronously by running the shell command in the Angular 2 project directory and configuring the output to the Cordova www directory. Now we have to declare this value in the config.xml file to be executed before the Cordova app is built. We will use the hook before_prepare, as it will trigger preparing, building or running the application. Add the following lines to the config.xml file:
```xml
    <!-- Build and prepare the Angular 2 application. -->
    <hook type="before_prepare" src="scripts/prepareAngular2App.js"/>
```



## Cordova - Android 

It is time to create an application that will be more useful than the browser platform. As we configured the build process, everything that we have to do is to add the Android platform and run it. Note that a valid Java and [Android SDK](https://developer.android.com/studio/index.html?hl=ko) has to be installed; to check if we meet the requirements run the command cordova requirements after adding the android platform.


### 13. Add Android Platform

```bash
cordova platform add android
cordova build android
```

Google broke Cordova Android 6.1.x and some other frameworks with their latest sdk tools update.
Cordova Android 6.2.1 has been released and it's now compatible with latest Android SDK.
You can update your current incompatible android platform with cordova platform update android@6.2.1
Or you can remove the existing platform and add the new one (will delete any manual change you did inside yourProject/platforms/android/ folder)

```bash
cordova platform rm android
cordova platform add android@6.2.1
cordova build android
```

### 14. Opening in Android Studio
Then just open up the project using File > Open and pointing to the (yourProjectDir)/Platforms/Android directory.


## Firebase Deployment
### 15. Build Production 

This command runs a build for our project but with additional production optimizations such as bundling and minification. Now your project should have a dist/ directory. This is where all of our compiled ready to deploy code is located every time we run a build.
```bash
ng build --prod
```

### 16. Installatino Firebase CLI 

Now that we have a project created lets go back to the command line. Next we next install the Firebase CLI via NPM. In your console run the following command: npm install -g firebase-tools. Once installed run firebase login to login to your Firebase account.

```bash
npm install -g firebase-tools
firebase login
firebase init
```
sometime
firebase login --no-localhost

-------------------------





1. Init
	AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md	

	
2. Subscribe
	constructor(public af: AngularFire) {
		this.af.auth.subscribe(auth => console.log(auth));
	}
https://github.com/angular/angularfire2


3. Update profile
	if (user != null) {
	  user.providerData.forEach(function (profile) {
		console.log("Sign-in provider: "+profile.providerId);
		console.log("  Provider-specific UID: "+profile.uid);
		console.log("  Name: "+profile.displayName);
		console.log("  Email: "+profile.email);
		console.log("  Photo URL: "+profile.photoURL);
	  });
	}
https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information


4. Update Email
	var user = firebase.auth().currentUser;

	user.updateEmail("user@example.com").then(function() {
	  // Update successful.
	}, function(error) {
	  // An error happened.
	});
https://firebase.google.com/docs/auth/web/manage-users#set_a_users_email_address


4.1 sendEmailVerification
var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  // Email sent.
}, function(error) {
  // An error happened.
});


5. Router => CanActive

	import { ModuleWithProviders } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	import { CanActivateAuthGuard } from './auth.service'

	import { MyComponent } from './app.component';

	const routes: Routes = [
		{ path: '/home', component: MyComponent , canActivate: [CanActivateAuthGuard]}]
	/In auth service/

	import { CanActivate, Router } from '@angular/router';

	@Injectable()
	export class CanActivateAuthGuard implements CanActivate {
	  constructor(private router: Router) {}
		if (this.authService.isLoggedIn()) {
			return true;
		}
		//Redirect the user before denying them access to this route
		this.router.navigate(['/login']);
		return false;
	}

http://stackoverflow.com/questions/39684742/angular2-check-user-login


-------------------------





# Reference Sites

## Get Started

https://cordova.apache.org/docs/ko/6.x/guide/cli/index.html
https://github.com/angular/angularfire2
https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2

## CLI

https://github.com/angular/angular-cli/wiki
https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html
https://coryrylan.com/blog/deploy-angular-cli-apps-to-firebase

## JSON
http://www.jsoneditoronline.org/?id=c6e6aeed379a3edcdc9670623b8720cb

## FB DB for SQL Developer
https://www.youtube.com/playlist?list=PLl-K7zZEsYLlP-k-RKFa7RyNPa9_wCH2s

## FB Function-worker
https://github.com/firebase/functions-samples/blob/master/delete-unused-accounts-cron/functions/index.js
https://firebase.googleblog.com/2017/03/how-to-schedule-cron-jobs-with-cloud.html

## CORDOVA FCM PLUGIN
https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
https://github.com/fechanique/cordova-plugin-fcm
https://stackoverflow.com/questions/39230694/angularjs-is-there-any-way-to-send-push-notifications-using-angular-js-and-fcm
https://arnhem.luminis.eu/complete-angular-js-cordova-app-tutorial-part-4/
