import csv

from django.http import HttpResponse
from django.views import View
from django.views.generic.base import TemplateView
from rest_framework import viewsets

from applications_service.models import Application, CountableOutput, SummableOutput
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

    def _populate_dashboard_summary(self, summary, outputs):
        """
        Process the (Countable or Summable) outputs and add to the summary.
        """
        # TODO: Pretty certain this section could be simpler
        for output in outputs:
            (level_1_category, level_2_category) = output.criterion.output_category_hier

            if level_1_category not in summary:
                summary[level_1_category] = dict()

            if level_2_category not in summary[level_1_category]:
                summary[level_1_category][level_2_category] = dict()

            label = output.criterion.label
            unit = getattr(output.criterion, "unit", None)
            if unit:
                label += f" ({unit})"

            if label not in summary[level_1_category][level_2_category]:
                summary[level_1_category][level_2_category][label] = 0

            summary[level_1_category][level_2_category][
                label
            ] += output.committed_quantity

    def get_context_data(self, **kwargs):
        dashboard_summary = dict()

        self._populate_dashboard_summary(
            dashboard_summary,
            CountableOutput.objects.all().prefetch_related("criterion"),
        )
        self._populate_dashboard_summary(
            dashboard_summary,
            SummableOutput.objects.all().prefetch_related("criterion"),
        )

        applications = (
            Application.objects.all()
            .prefetch_related("fund")
            .prefetch_related("countable_outputs")
            .prefetch_related("summable_outputs")
        )

        return {
            "applications": applications,
            "dashboard_summary": dashboard_summary,
        }


class ApplicationsCsvDownloadView(View):
    """
    Serve a CSV representing the Applications
    """

    def get(self, request):
        fieldnames_application = ["Fund", "Title", "Submitted"]

        countable_criteria_labels = [c.label for c in CountableCriterion.objects.all()]
        summable_criteria_meta = [
            (c.label, c.unit) for c in SummableCriterion.objects.all()
        ]

        csv_fieldnames = (
            fieldnames_application
            + countable_criteria_labels
            + [f"{label} ({unit})" for (label, unit) in summable_criteria_meta]
        )

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="AllApplications.csv"'

        writer = csv.DictWriter(response, fieldnames=csv_fieldnames)
        writer.writeheader()

        applications = Application.objects.all().prefetch_related("countable_outputs")

        for application in applications:
            row_data = {
                "Fund": application.fund.name,
                "Title": application.title,
                "Submitted": application.submitted_at,
            }
            # TODO: Optimise for performance; this is just a prototype with small data sets
            for label in countable_criteria_labels:
                try:
                    output = application.countable_outputs.get(criterion__label=label)
                    row_data[label] = output.committed_quantity
                except CountableOutput.DoesNotExist:
                    # Applications will not have an output of every kind
                    pass
            for (label, unit) in summable_criteria_meta:
                try:
                    output = application.summable_outputs.get(criterion__label=label)
                    row_data[f"{label} ({unit})"] = output.committed_quantity
                except SummableOutput.DoesNotExist:
                    # Applications will not have an output of every kind
                    pass
            writer.writerow(row_data)

        return response
