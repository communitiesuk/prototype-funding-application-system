from django.contrib import admin
from funds_service.models import CountableCriterion, Fund, SummableCriterion


class CountableCriterionAdmin(admin.ModelAdmin):
    fields = [
        "output_category",
        "label",
        "guidance_notes",
    ]

    list_display = [
        "label",
        "output_category",
    ]


class SummableCriterionAdmin(admin.ModelAdmin):
    fields = [
        "output_category",
        "label",
        "unit",
        "guidance_notes",
    ]
    list_display = [
        "label",
        "unit",
        "output_category",
    ]


class FundAdmin(admin.ModelAdmin):
    fields = [
        "name",
        "short_description",
        "long_description",
        "countable_criteria",
        "summable_criteria",
    ]

    list_display = (
        "name",
        "short_description",
        "countables_summary",
        "summables_summary",
    )


admin.site.register(CountableCriterion, CountableCriterionAdmin)
admin.site.register(Fund, FundAdmin)
admin.site.register(SummableCriterion, SummableCriterionAdmin)
