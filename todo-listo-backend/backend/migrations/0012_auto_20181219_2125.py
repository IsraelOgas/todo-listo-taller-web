# Generated by Django 2.0.4 on 2018-12-20 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_auto_20181219_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='fecha_inicio',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='fecha_termino',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='lat',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='lng',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]