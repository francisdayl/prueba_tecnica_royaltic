from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from store import views

router = routers.DefaultRouter()
router.register(r"category", views.CategoryView, "category")
router.register(r"product", views.ProductView, "product")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='API Doc')),
]