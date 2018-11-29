import { Geolocation } from '@ionic-native/geolocation';
import { Component,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Option } from 'ionic-angular';
import leaflet from 'leaflet';
import {NativeGeocoder,NativeGeocoderForwardResult,} from '@ionic-native/native-geocoder';
import  "leaflet";
import "leaflet-tilelayer-mbtiles-ts";


declare var L:any;
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
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click',() => {
        // alert('Marker clicked')

        let prompt = this.alertCtrl.create({
                title: 'Add Infomation',
               message: "",
                inputs: [
                  {
                     name: 'info',
                     placeholder: 'Info'
                   },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                     handler: data => {
                      console.log('Cancel clicked');
                   }
                   },
                   {
                     text: 'Save',
                     handler: data => {
                      
                       this.geoCodeandAdd(data.city);
                    }
                   }
                 ]
             });
               prompt.present();
                

      })
      markerGroup.addLayer(marker);
       this.map.addLayer(markerGroup);
        })  
  }
  

}

 

