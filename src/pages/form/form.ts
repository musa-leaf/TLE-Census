import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  numberOfPeople : number = 0;
  age_group;
  occupation;
  gender;
  ethnic_group;
  forms : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.forms.length);
    
  }

  updateResults(){
    this.forms.length = this.numberOfPeople;        
  }

  save(i){
    console.log(i);
    this.forms[i] = {
      location : "25.555,26.333",
      ethnic_group : this.ethnic_group,
      age_group : this.age_group,
      occupation : this.occupation,
      gender : this.gender
    };

    console.table(this.forms);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

}
