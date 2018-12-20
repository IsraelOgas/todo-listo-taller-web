import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';
import { AppComponent } from '../app.component';
import { Tarea } from '../tarea';
import * as L from 'leaflet';

@Component({
  selector: 'app-tareas-mapa',
  templateUrl: './tareas-mapa.component.html',
  styleUrls: ['./tareas-mapa.component.css']
})
export class TareasMapaComponent implements OnInit {
  options;
  user_token: String;
  tareas: Array<Tarea>;
  markers: L.Layer[] = [];

  constructor(public tareaService: TareaService) {
    this.user_token = window.localStorage.getItem('user_token');
  }

  ngOnInit() {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,
      center: L.latLng(-33.0454915, -71.6124715),
    };
    this.tareaService.getTareas(this.user_token)
      .subscribe((ts: Array<Tarea>) => {
        this.tareas = ts;
        this.rellenarMap()
      })
  }

  rellenarMap() {
    for (let index = 0; index < this.tareas.length; index++) {
      let lat, lng;
      //console.log(this.tareas[index])
      if (this.tareas[index].lat != null && this.tareas[index].lng != null) {
        lat = parseFloat(this.tareas[index].lat);
        //console.log(lat)
        lng = parseFloat(this.tareas[index].lng);
        //console.log(lng)

        const newMarker = L.marker([lat, lng], {
          title: this.tareas[index].titulo,
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        });
        this.markers.push(newMarker);
    
        newMarker.bindPopup(`<p><b>${this.tareas[index].titulo}</b> <br/>${this.tareas[index].descripcion}<br/><small> ${this.tareas[index].fecha_inicio}</small><br/><small>${this.tareas[index].fecha_termino}</small><br/></p>`)

        newMarker.on('click', function (e) {
          this.openPopup();
        })
      }
    }
  }

  mapClick(evt) {
    console.log('he clickeado')
  }

  refrescarTareas() {
    this.tareaService.getTareas(this.user_token)
      .subscribe((ts: Array<Tarea>) => {
        this.tareas = ts;
      });
  }
}
