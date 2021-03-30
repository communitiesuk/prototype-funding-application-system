import csv

from django.db.models import Max, Sum
from django.http import HttpResponse
from django.views import View
from django.views.generic.base import TemplateView
from rest_framework import viewsets

from applications_service.models import Application
from applications_service.serializers import ApplicationSerializer
from funds_service.models import CountableCriterion, SummableCriterion


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
        applications = (
            Application.objects.all()
            .prefetch_related("fund")
            .prefetch_related("countable_outputs")
            .prefetch_related("summable_outputs")
        )
        # Don't get confused here with the fact we Sum our countables as well
        # as our summables :)
        countables_summary = CountableCriterion.objects.values("label").annotate(
            total=Sum("application_outputs__committed_quantity")
        )
        summables_summary = SummableCriterion.objects.values("label").annotate(
            total=Sum("application_outputs__committed_quantity"),
            unit=Max("unit"),
        )

        return {
            "applications": applications,
            "countables_summary": countables_summary,
            "summables_summary": summables_summary,
        }


class ApplicationsCsvDownloadView(View):
    """
    Serve a CSV representing the Applications
    """

    def get(self, request):
        fieldnames_application = ["Fund", "Title", "Submitted"]

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="AllApplications.csv"'

        writer = csv.DictWriter(response, fieldnames=fieldnames_application)
        writer.writeheader()

        for application in Application.objects.all():
            writer.writerow(
                {
                    "Fund": application.fund.name,
                    "Title": application.title,
                    "Submitted": application.submitted_at,
                }
            )

        return response
