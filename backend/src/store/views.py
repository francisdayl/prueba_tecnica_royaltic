from decimal import Decimal
from django.http import JsonResponse
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from random import randint


# Create your views here.
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    @action(detail=True, methods=["get"])
    def full(self, request, pk=None):
        product: Product = Product.objects.get(id=pk)
        serializer = self.get_serializer(product, many=False)
        response_data = serializer.data
        response_data["category"] = CategorySerializer(
            product.category.all(),
            many=True,
        ).data
        return Response(response_data)

    @action(detail=True, methods=["get"])
    def related_products(self, request, pk=None):
        product: Product = Product.objects.get(id=pk)
        product_categories = product.category.all()
        common_category_products = (
            Product.objects.filter(category__in=product_categories)
            .exclude(id=product.id)
            .distinct()
        )
        serializer = self.get_serializer(common_category_products, many=True)
        response_data = serializer.data
        for instance in response_data:
            instance["categories"] = CategorySerializer(
                common_category_products.get(id=instance["id"]).category.all(),
                many=True,
            ).data

        return Response(response_data[:5])


@action(detail=False, methods=["get"])
def seed(request):
    Product.objects.all().delete()
    Category.objects.all().delete()
    categories = [
        "Electrónica",
        "Ropa y Accesorios",
        "Hogar y Cocina",
        "Juguetes y Juegos",
        "Deportes y Aire Libre",
        "Libros",
        "Salud y Belleza",
        "Alimentos y Bebidas",
        "Automóviles y Accesorios",
        "Herramientas y Mejoras del Hogar",
    ]
    Category.objects.bulk_create([Category(name=category) for category in categories])
    categories_id = {category.name: category.id for category in Category.objects.all()}
    productos = [
        {"nombre": "Smartphone", "categorias": ["Electrónica", "Salud y Belleza"]},
        {"nombre": "Laptop", "categorias": ["Electrónica", "Hogar y Cocina"]},
        {
            "nombre": "Camiseta deportiva",
            "categorias": ["Ropa y Accesorios", "Deportes y Aire Libre"],
        },
        {"nombre": "Libro de cocina", "categorias": ["Libros", "Hogar y Cocina"]},
        {
            "nombre": "Bicicleta",
            "categorias": ["Deportes y Aire Libre", "Automóviles y Accesorios"],
        },
        {
            "nombre": "Freidora de aire",
            "categorias": ["Hogar y Cocina", "Herramientas y Mejoras del Hogar"],
        },
        {
            "nombre": "Cámara fotográfica",
            "categorias": ["Electrónica", "Deportes y Aire Libre"],
        },
        {"nombre": "Auriculares", "categorias": ["Electrónica", "Salud y Belleza"]},
        {
            "nombre": "Sartén antiadherente",
            "categorias": ["Hogar y Cocina", "Herramientas y Mejoras del Hogar"],
        },
        {
            "nombre": "Muñeca de colección",
            "categorias": ["Juguetes y Juegos", "Libros"],
        },
        {
            "nombre": "Zapatillas deportivas",
            "categorias": ["Ropa y Accesorios", "Deportes y Aire Libre"],
        },
        {
            "nombre": "Coche a control remoto",
            "categorias": ["Juguetes y Juegos", "Electrónica"],
        },
        {
            "nombre": "Cinta de correr",
            "categorias": ["Deportes y Aire Libre", "Salud y Belleza"],
        },
        {"nombre": "Perfume", "categorias": ["Salud y Belleza", "Ropa y Accesorios"]},
        {
            "nombre": "Juego de cubiertos",
            "categorias": ["Hogar y Cocina", "Alimentos y Bebidas"],
        },
        {
            "nombre": "Taladro inalámbrico",
            "categorias": [
                "Herramientas y Mejoras del Hogar",
                "Automóviles y Accesorios",
            ],
        },
        {"nombre": "Televisor", "categorias": ["Electrónica", "Hogar y Cocina"]},
        {
            "nombre": "Patinete eléctrico",
            "categorias": ["Automóviles y Accesorios", "Deportes y Aire Libre"],
        },
        {
            "nombre": "Juego de mesa",
            "categorias": ["Juguetes y Juegos", "Hogar y Cocina"],
        },
        {
            "nombre": "Cámara de seguridad",
            "categorias": ["Electrónica", "Herramientas y Mejoras del Hogar"],
        },
    ]
    products = [
        Product(
            name=product["nombre"],
            description="Elit minim duis anim quis officia id commodo.",
            price=round(randint(500, 1000) / 10, 2),
        )
        for product in productos
    ]

    with transaction.atomic():
        Product.objects.bulk_create(products)
        created_products = Product.objects.filter(
            name__in=[p["nombre"] for p in productos]
        )
        for product_obj, product_data in zip(created_products, productos):
            product_obj.category.set(
                [categories_id[category] for category in product_data["categorias"]]
            )

    return JsonResponse(data={"message": "ok", "status": 200})
