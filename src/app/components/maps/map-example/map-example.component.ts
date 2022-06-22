import { Component, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import { icon, Marker } from "leaflet";
import * as geojson from "geojson";
import data from "../../../../assets/json/geojson.json";
import points from "../../../../assets/json/markers.json";

const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: "app-map-example",
  templateUrl: "./map-example.component.html",
})
export class MapExampleComponent implements AfterViewInit {
  map: any;
  geoJsonData: any = data;
  geoJsonPoints: any = points;
  geoJsonFeatures: geojson.FeatureCollection = this.geoJsonData;

  constructor() {}

  ngAfterViewInit(): void {
    this.map = L.map("map", {
      center: L.latLng(-0.1643643, -78.4616089),
      zoom: 11,
    });

    var openStreetLayer = new L.TileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        minZoom: 3,
        maxZoom: 18,
        attribution:
          "<a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
      }
    );
    openStreetLayer.addTo(this.map);

    var myLayer = L.geoJSON(this.geoJsonFeatures, {
      style: function (feature) {
        return feature.properties.style;
      },
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type == "Point") {
          layer.bindPopup(
            "<b>" +
              feature.properties.sector +
              " - " +
              feature.properties.ciudad +
              "</b>" +
              "<br>" +
              feature.properties.nombre
          );
        }
      },
    });
    myLayer.addTo(this.map);
  }
}
