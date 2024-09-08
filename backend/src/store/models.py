from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(
        null=False,
        blank=False,
        unique=True,
        max_length=30,
        verbose_name="Category Name",
    )

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(
        null=False, blank=False, max_length=30, verbose_name="Product Name"
    )
    image = models.TextField(null=True, verbose_name="Product Image")
    description = models.TextField(
        null=False, blank=False, verbose_name="Product Description"
    )
    price = models.DecimalField(
        null=False,
        blank=False,
        decimal_places=2,
        max_digits=12,
        verbose_name="Product Price",
    )
    category = models.ManyToManyField(Category, verbose_name="Product Category")

    def __str__(self) -> str:
        return f"{self.name} for ${self.price}"
