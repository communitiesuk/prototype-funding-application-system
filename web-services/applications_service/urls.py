from django.urls import path
from rest_framework.routers import DefaultRouter

from applications_service.views import ApplicationsDashboardView, ApplicationViewSet

urlpatterns = [
    path("dashboards/applications/", ApplicationsDashboardView.as_view()),
]

router = DefaultRouter()
router.register(r"api/applications", ApplicationViewSet, basename="application")
urlpatterns += router.urls
