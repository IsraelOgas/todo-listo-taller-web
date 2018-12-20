from django.db import models
from django.contrib.auth.models import User

class Estado(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
    def __unicode__(self):
        return self.nombre

class Tarea(models.Model):
    titulo        = models.CharField(max_length=100)
    descripcion   = models.CharField(max_length=255)
    fecha_inicio  = models.DateTimeField(null = True, blank=True)
    fecha_termino = models.DateTimeField(null = True, blank=True)
    estado        = models.ForeignKey(Estado, on_delete=models.CASCADE, default=1)
    lat           = models.CharField(max_length=50, null = True, blank=True)
    lng           = models.CharField(max_length=50, null = True, blank=True)
    user          = models.ForeignKey(User, related_name='tareas', on_delete=models.CASCADE, blank=True)

    @property
    def nombre_estado(self):
        return self.estado.nombre