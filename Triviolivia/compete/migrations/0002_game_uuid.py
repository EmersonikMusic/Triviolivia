# Generated by Django 3.2.12 on 2023-02-26 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compete', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='uuid',
            field=models.CharField(default=True, max_length=64, unique=True),
            preserve_default=False,
        ),
    ]
