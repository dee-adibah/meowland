# Generated by Django 4.2.1 on 2023-05-11 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='thread',
            old_name='user',
            new_name='creator',
        ),
    ]