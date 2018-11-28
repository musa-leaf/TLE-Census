import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
//
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule} from 'angularfire2/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage} from "../pages/home/home";
import { MyApp } from './app.component';
import {Geolocation} from '@ionic-native/geolocation';
// import { MarkersProvider } from '../providers/markers/markers';
// import { AngularFireModule } from '@angular/fire';
// import {AngularFirestoreModule } from 'angularfire2/firestore';



// var config = {
//   apiKey: "AIzaSyCKzt1uWneqkIobS7gE-Md7GfngdSCgweQ",
//     authDomain: "traffic-c0d4b.firebaseapp.com",
//     databaseURL: "https://traffic-c0d4b.firebaseio.com",
//     projectId: "traffic-c0d4b",
//     storageBucket: "traffic-c0d4b.appspot.com",
//     messagingSenderId: "34629877709"


// }

@NgModule({
  declarations: [
    MyApp,HomePage

  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(config),
    // AngularFirestoreModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,HomePage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler ,useClass: IonicErrorHandler},
    // MarkersProvider
  ]
})
export class AppModule {}
