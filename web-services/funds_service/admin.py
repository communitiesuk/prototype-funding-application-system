from django.contrib import admin
from funds_service.models import Fund, CountableCriterion, SummableCriterion


class CountableCriterionInline(admin.StackedInline):
    model = CountableCriterion
    extra = 1


class SummableCriterionInline(admin.StackedInline):
    model = SummableCriterion
    extra = 1


class FundAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "short_description",
        "countables_stipulated",
        "summables_stipulated",
    )

    inlines = [
        CountableCriterionInline,
        SummableCriterionInline,
    ]


admin.site.register(Fund, FundAdmin)
