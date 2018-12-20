import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { Observable, of, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) { }

  crearTarea(t: Tarea, user_token): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user_token
      })
    };
    return this.http.post('http://localhost:8000/tareas/', {
      'titulo': t.titulo,
      'descripcion': t.descripcion,
      'estado': t.estado,
      'fecha_inicio': t.fecha_inicio,
      'fecha_termino': t.fecha_termino,
      'lat': t.lat,
      'lng': t.lng,
    }, httpOptions)
  }

  actualizarTarea(t: Tarea, user_token): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user_token
      })
    };
    return this.http.put(`http://localhost:8000/tareas/${t.id}/`, {
      'titulo': t.titulo,
      'descripcion': t.descripcion,
      'fecha_inicio': t.fecha_inicio,
      'fecha_termino': t.fecha_termino,
      'estado': t.estado,
      'lat': t.lat,
      'lng': t.lng,
    }, httpOptions)
  }

  getTareas(user_token): Observable<any> {
    console.log(`Tarea service user_token: ${user_token}`);
    return this.http.get('http://localhost:8000/tareas/', {
      headers: {'Authorization': `Token ${user_token}`}
    });
  }
}
