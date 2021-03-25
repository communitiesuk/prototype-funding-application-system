from django.views.generic.base import TemplateView
from rest_framework import viewsets

from applications_service.models import Application
from applications_service.serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    """
    CRUD API operations for Applications.

    Clearly we have left open DELETE etc; this is just a prototype and so we want
    the quickest code solution possible.
    """

    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationsDashboardView(TemplateView):
    """
    Simple summary dashboard for all Application objects.
    """

    template_name = "applications_service/applications_dashboard.html"

    def get_context_data(self, **kwargs):
        return {
            "applications": Application.objects.all().prefetch_related("fund"),
        }
