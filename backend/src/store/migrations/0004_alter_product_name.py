# Generated by Django 5.1.1 on 2024-09-08 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0003_alter_product_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField(max_length=60, verbose_name="Product Name"),
        ),
    ]
