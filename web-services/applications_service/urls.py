from django.urls import path
from rest_framework.routers import DefaultRouter

from applications_service.views import (
    ApplicationsCsvDownloadView,
    ApplicationsDashboardView,
    ApplicationViewSet,
)

urlpatterns = [
    path("download_csv/", ApplicationsCsvDownloadView.as_view()),
    path("dashboards/applications/", ApplicationsDashboardView.as_view()),
]

router = DefaultRouter()
router.register(r"api/applications", ApplicationViewSet, basename="application")
urlpatterns += router.urls
