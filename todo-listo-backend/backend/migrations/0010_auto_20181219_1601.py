# Generated by Django 2.0.4 on 2018-12-19 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20181219_1501'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarea',
            name='lat',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='lng',
            field=models.CharField(max_length=50, null=True),
        ),
    ]