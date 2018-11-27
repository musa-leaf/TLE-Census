import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
  date;
  time;

  people = [];

  
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {    

  }

  save(){
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


