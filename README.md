
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

#### Custom FirebaseApp Names
You can optionally provide a custom FirebaseApp name with `initializeApp`.

```ts
@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig, 'my-app-name')
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



## Cordova CLI - Install   // https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
-- npm install -g cordova


## Cordova - Create Project  // https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
-- in the <project-name> folder
-- cordova create cordova com.example.hello HelloWorld  // https://cordova.apache.org/docs/ko/6.x/guide/cli/index.html
-- tree cordova


## Cordova - Add Web Platfom
-- cd cordova
-- cordova platform add browser
-- cordova run browser


## Cordova - Automation build
rm -r www
cd ..
ng build --target=production --environment=prod --output-path cordova/www/
cd cordova
cordova run browser






#Reference Sites
##Get Started
https://cordova.apache.org/docs/ko/6.x/guide/cli/index.html
https://github.com/angular/angularfire2
https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2

##CLI
https://github.com/angular/angular-cli/wiki
https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html
