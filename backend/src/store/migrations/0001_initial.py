# Generated by Django 5.1.1 on 2024-09-07 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=30, unique=True, verbose_name="Category Name"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=30, verbose_name="Product Name")),
                (
                    "image",
                    models.ImageField(upload_to="", verbose_name="Product Image"),
                ),
                ("description", models.TextField(verbose_name="Product Description")),
                (
                    "price",
                    models.DecimalField(
                        decimal_places=2, max_digits=12, verbose_name="Product Price"
                    ),
                ),
                (
                    "category",
                    models.ManyToManyField(
                        to="store.category", verbose_name="Product Category"
                    ),
                ),
            ],
        ),
    ]
