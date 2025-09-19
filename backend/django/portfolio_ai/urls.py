from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/analytics/', include('analytics.urls')),
    path('api/ai/', include('ai_features.urls')),
]