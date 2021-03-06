import { Component, OnInit } from '@angular/core';
import { Tarea, EstadoTarea } from './tarea';
import { TareaService } from './tarea.service';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Todo Listo!';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: Array<Tarea>;
  newTarea: Tarea;
  location = {
    lat : String,
    lng : String
  }

  username: string;
  password: string;
  loggedIn = false;
  user_token: string;
  options; 

  constructor(public tareaService: TareaService, private http: HttpClient) {
    this.tareas = [];
    this.newTarea = new Tarea(null, null, null, null, null, 0);
    let maybe_user_token = window.localStorage.getItem('user_token');
    console.log(`ls user token: ${maybe_user_token}`);
    if(maybe_user_token) {
      this.loggedIn = true;
      this.user_token = maybe_user_token; 
    }
  }

  iniciarSesion() {
    console.log(`u: ${this.username} - p: ${this.password}`);  
    this.http.post('http://localhost:8000/rest-auth/login/', {
      'username': this.username,
      'password': this.password,
    }).subscribe(res => {
        console.log(`res: ${res['key']}`);
        this.loggedIn = true;
        this.user_token = res['key'];
        window.localStorage.setItem('user_token', res['key']);
        this.refrescarTareas();
    })  
  }

  cerrarSesion() {
    window.localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,      
      center: L.latLng(-33.0454915,-71.6124715),
    };
    

    this.refrescarTareas();
    interval(30 * 1000).subscribe(_ => {
      console.log('Refrescando tareas');
      this.refrescarTareas();
    });
  }

  refrescarTareas() {
    this.tareaService.getTareas(this.user_token)
      .subscribe((ts: Array<Tarea>) => {
        this.tareas = ts;
        //console.log(this.tareas);
      });
  }

  mapClick(evt) {
    console.log(`Click: ${evt}`);
    console.log(Object.keys(evt));
    console.log(evt['latlng']);
    console.log(evt['latlng'].lat);
    console.log(evt['latlng'].lng);
    this.newTarea.lat = evt['latlng'].lat;
    this.newTarea.lng = evt['latlng'].lng;

    console.log(this.newTarea)
    
    this.addMarker(evt['latlng']);
  }

  markers: L.Layer[] = [];

  addMarker(latlng) {
    const newMarker = L.marker([latlng['lat'],  latlng['lng']], {
      icon: L.icon({
         iconSize: [ 25, 41 ],
         iconAnchor: [ 13, 41 ],
         iconUrl:   'assets/marker-icon.png',
         shadowUrl: 'assets/marker-shadow.png'
      })
    });

    while(this.markers.length > 0) {
      this.markers.pop();
    }
		this.markers.push(newMarker);
	}

  actualizarTarea(t: Tarea) {
    console.log(`La tarea ${t} fue actualizada!`);
    this.tareaService.actualizarTarea(t, this.user_token).subscribe(_ => { });
    //window.location.reload();
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  crearTarea() {
    console.log(this.newTarea);
    this.tareaService.crearTarea(this.newTarea, this.user_token).subscribe(_ => {
      console.log('Creacion Tarea OK');
      this.refrescarTareas();
      //window.location.reload();
    })
  }

  estado2str(e: EstadoTarea) {
    switch (e) {
      case EstadoTarea.Creada: return 'Creada';
      case EstadoTarea.EnProceso: return 'En Proceso';
      case EstadoTarea.Terminada: return 'Terminada';
    }
  }

}