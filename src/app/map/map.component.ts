import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private centroid: L.LatLngExpression = [36.800, 10.1864];
  constructor() { }

  private initMap(): void {
    this.map = L.map('map',{
      center: this.centroid,
      zoom: 1
    });
    const tiles = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=57XMBquwc7haRCgQDYWX', {
      maxZoom: 24,
      minZoom: 10,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });
    
    tiles.addTo(this.map);
    var marker = L.marker([36.85045,10.19235 ]).addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }

}
