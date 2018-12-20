export enum EstadoTarea {
    Creada
    , EnProceso
    , Terminada
}

export function estado2str(e: EstadoTarea): string {
    switch (e) {
      case EstadoTarea.Creada: return 'Creada';
      case EstadoTarea.EnProceso: return 'En Proceso';
      case EstadoTarea.Terminada: return 'Terminada';
    }
  }

export class Tarea {
    id: number;
    titulo: string;
    descripcion;
    estado: EstadoTarea;
    fecha_inicio: Date;
    fecha_termino: Date;
    lat: string;
    lng: string;

    constructor(id, titulo, descripcion, lat, lng, estado = EstadoTarea.Creada) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fecha_inicio = new Date();
        this.fecha_termino = new Date();
        this.lat = lat;
        this.lng = lng;
    }

    toString() {
        return `Tarea #${this.id}: ${this.titulo}`;
    }
}
