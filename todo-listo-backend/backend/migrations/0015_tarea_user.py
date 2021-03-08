# Generated by Django 2.0.6 on 2018-12-20 01:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0014_remove_tarea_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarea',
            name='user',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='tareas', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]