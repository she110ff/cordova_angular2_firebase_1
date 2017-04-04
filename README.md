# cordova_angular2_firebase_1



1. Node.js install

2. Angular cli install

npm uninstall -g angular-cli  // https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md

npm cache clean

npm install -g @angular/cli@latest

npm install -g typings   // The TypeScript Definition Manager

npm install -g typescript


3. New Project       // https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
-- ng new <project-name> => readers123
-- cd <project-name> 
-- ng serve
-- open http://localhost:4200   => app works!

4. AngularFire 2  // https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
-- npm install angularfire2 firebase --save

5. Cordova cli install   // https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
-- npm install -g cordova
-- UNABLE_TO_VERIFY_LEAF_SIGNITURE error
-- npm config set strict-ssl false
-- npm install -g cordova


6. Create Cordova Project  // https://www.becompany.ch/en/blog/2016/10/19/creating-apache-cordova-app-with-angular2
-- in the <project-name> folder
-- cordova create cordova com.example.hello HelloWorld  // https://cordova.apache.org/docs/ko/6.x/guide/cli/index.html
-- tree cordova

7. Add Web Platfom
-- cd cordova
-- cordova platform add browser
-- cordova run browser

