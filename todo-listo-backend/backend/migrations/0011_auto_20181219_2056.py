# Generated by Django 2.0.4 on 2018-12-19 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20181219_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='fecha_inicio',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='fecha_termino',
            field=models.DateField(blank=True, null=True),
        ),
    ]
