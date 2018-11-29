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

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    MyApp,HomePage

  ],
  imports: [
    BrowserModule,
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
    
  ]
})
export class AppModule {}
