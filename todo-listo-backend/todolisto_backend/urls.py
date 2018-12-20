"""todolisto_backend URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from backend.models import Tarea, Estado
from rest_framework import routers, serializers, viewsets
from rest_framework import permissions, authentication
from django.contrib.auth.models import User

class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'nombre')

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class TareaSerializer(serializers.ModelSerializer):
    nombre_estado = serializers.ReadOnlyField()
    estado = serializers.PrimaryKeyRelatedField(queryset=Estado.objects.all(), required=True)
                    
    class Meta:
        model = Tarea
        fields = ('id', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_termino', 'estado', 'nombre_estado', "lat", "lng", "user")        

class TareaViewSet(viewsets.ModelViewSet):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TareaSerializer

    def get_queryset(self):
        return Tarea.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    tareas = TareaSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('__all__')

router = routers.DefaultRouter()
router.register(r'tareas', TareaViewSet, base_name='tareas')
router.register(r'estados', EstadoViewSet, base_name='estados')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls'))
]
