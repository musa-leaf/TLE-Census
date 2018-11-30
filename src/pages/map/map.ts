import { Geolocation } from '@ionic-native/geolocation';
import { Component,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Option } from 'ionic-angular';
import leaflet from 'leaflet';
import {NativeGeocoder,NativeGeocoderForwardResult,} from '@ionic-native/native-geocoder';
import  "leaflet";
import "leaflet-tilelayer-mbtiles-ts";


declare var L:any;
declare var firebase;

@IonicPage() 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  geoCodeandAdd(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  @ViewChild("map") mapContainer: ElementRef;
  map: any;
  lat:any;
  lng:any;
  city:string;
  people = [];
  constructor(
    private nativeGeocoder: NativeGeocoder,
    public geo: Geolocation,public navCtrl: NavController,
     public navParams: NavParams,private alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
     console.log('ionViewDidLoad MapPage');
             this.geo.getCurrentPosition().then(pos => {
          this.lat = pos.coords.latitude;
        this.lng =pos.coords.longitude;
            
      }).catch( err => console.log(err));
  
    }
  ionViewDidEnter(){
    this.prepareMap();
  }
  prepareMap(){
    firebase.database().ref('people/').on("value",(snapshot) =>{
      snapshot.forEach(element => { 
      this.people.push({Occupation:element.val().Occupation,Race:element.val().Race,Age:element.val().Age,Gender:element.val().Gender});
      console.log(this.people);
      this.map = leaflet.map("map").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 80
      }).addTo(this.map);
      this.map.locate({
      setView:true,
        
      maxZoom:10
     }).on('locationfound', (e) => {
          console.log('Your location has been found');
         let markerGroup =leaflet.featureGroup();
         let marker: any = leaflet.marker([element.val().Location.Lat, element.val().Location.Lng]).on('click',() => {
           // alert('Marker clicked')
           this.people.forEach(element => { 
            marker.bindPopup("<b>Information</b> <br>"+element.Occupation+" : "+element.Race+" "+element.Age+" "+element.Gender).openPopup();
           });
          //  
          //  let prompt = this.alertCtrl.create({
          //          title: 'Person Infomation',
          //         message: element.val().Race+" "+element.val().Age+" "+element.val().Occupation+" "+element.val().Gender,
          //          buttons: [
          //            {
          //              text: 'Cancel',
          //               handler: data => {
          //                console.log('Cancel clicked');
          //             }
          //             },
          //             {
          //               text: 'Save',
          //               handler: data => {
                          
          //              }
          //             }
          //           ]
          //       });
          //         prompt.present();
                   
   
         })
         markerGroup.addLayer(marker);
          this.map.addLayer(markerGroup);
           })  
       });
    }) 
   console.log("------------------"+this.people)
  }
  

}

 

