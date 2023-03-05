# Generated by Django 3.2.12 on 2023-02-26 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configure', '0004_difficulty_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='response',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, related_name='questions', to='configure.Tags'),
        ),
    ]
