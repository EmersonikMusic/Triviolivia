# Generated by Django 3.2.12 on 2023-02-26 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configure', '0005_auto_20230226_1434'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
