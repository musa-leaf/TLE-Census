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
  people:Array<any> = [];
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
    var planes = [
      ["Area 1",-25.752222,28.189612],
      ["Area 2",-25.771502,28.077402],
      ["Area 3",-25.722005,28.388896],
      ["Area 4",-25.752159,28.19102],
      ["Area 5",-25.830546,28.225315]
      ];  

    var peopleLocation = [

    ]
    
    this.map = leaflet.map("map").fitWorld();
    firebase.database().ref('people/').on("value",(snapshot) =>{
      snapshot.forEach(element => {  
      this.people.push({Occupation:element.val().Occupation,Race:element.val().Race,Age:element.val().Age,Gender:element.val().Gender,LocationX:element.val().Location.Lat,LocationY:element.val().Location.Lat}); 
      peopleLocation.push([element.val().Occupation,element.val().Location.Lat,element.val().Location.Lng,element.val().Race,element.val().Age,element.val().Gender]);
 
      console.log(this.people);
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 80
      }).addTo(this.map);
      this.map.locate({
      setView:true,
        
      maxZoom:10
     }).on('locationfound', (e) => {   
          console.log('Your location has been found');
         let markerGroup =leaflet.featureGroup();
         for (var i = 0; i < peopleLocation.length; i++) {
        let  marker = new L.circle([peopleLocation[i][1],peopleLocation[i][2]],{
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.7,
          radius: 500
        })
            .bindPopup("<b>Informarion</b>"+ " <br>"+peopleLocation[i][0]+"<br>"+peopleLocation[i][3]+"<br>"+peopleLocation[i][4]+" age <br>"+peopleLocation[i][5])
            .addTo(this.map); 
        }  
        
          this.map.addLayer(markerGroup);
           })  
       });
    })  
  } 
}

 

