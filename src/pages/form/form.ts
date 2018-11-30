import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {


  age_group;
  occupation;
  gender;
  ethnic_group;
  location;
  date ;
  time;
  people = [];
  lat;
  lng;
  
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public geo: Geolocation) {    
    this.time = moment().format('H:mm a')
    this.date = moment().format('MMMM DD YYYY');  
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
    this.lng =pos.coords.longitude;
        
  }).catch( err => console.log(err));

  firebase.database().ref().on("value",(snapshot) =>{
    snapshot.forEach(element => { 
     });
  }) 
}

  save(){
    firebase.database().ref().push({Gender:this.gender,Race:this.ethnic_group,Age:this.age_group,Occupation:this.occupation,Location:{lat:this.lat,lng:this.lng}})
    this.saveToArray();
    this.showConfirm();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Add new data',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.pop();
          }
        },
        {
          text: 'Add more',
          handler: () => {
            console.log('Agree clicked');
            this.clearForm();
            
          }
        }
      ]
    });
    confirm.present();
  }

  saveToArray(){
    this.people.push(
      {
        age : this.age_group,
        occupation : this.occupation,
        gender: this.gender,
        ethnicity : this.ethnic_group,
        location : this.location,
        date : this.date,
        time: this.time
      }
    );

    console.table(this.people);
  }

  clearForm(){
    this.age_group ="";
    this.occupation  ="";
    this.gender  ="";
    this.ethnic_group  ="";
  }

  remove(i){
    console.log(i);
    this.people.splice(i,1);
    
  }

}


