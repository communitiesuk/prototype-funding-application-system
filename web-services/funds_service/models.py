from django.db import models


class Fund(models.Model):
    name = models.CharField(max_length=255, help_text="Give a short name to this Fund")
    short_description = models.CharField(
        max_length=255,
        help_text="Give a short description, shown to the Applicant in the choice list",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
