from django.contrib import admin
from funds_service.models import Fund


class FundAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "short_description",
    )


admin.site.register(Fund, FundAdmin)
