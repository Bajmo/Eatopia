# Generated by Django 4.1 on 2023-05-05 21:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_remove_restaurant_img1_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clientuser',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.address'),
        ),
    ]