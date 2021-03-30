from django.db import models


class CountableCriterion(models.Model):
    """
    Additional Fund element which captures a criterion which can be counted to be totalled.
    """

    label = models.CharField(
        max_length=255, help_text='Plural name of the criterion (e.g. "Rail routes")'
    )
    guidance_notes = models.TextField(
        help_text=(
            "Provide information to assist the applicant in "
            "understanding the correct interpretation of this output"
        )
    )

    class Meta:
        ordering = ["label"]
        verbose_name_plural = "Countable criteria"

    def __str__(self):
        return f"{self.label}"


class SummableCriterion(models.Model):
    """
    Additional Fund element which captures a criterion which can be summed to be totalled.
    """

    label = models.CharField(
        max_length=255, help_text='Singular name of the criterion (e.g. "Floorspace")'
    )
    guidance_notes = models.TextField(
        help_text=(
            "Provide information to assist the applicant in "
            "understanding the correct interpretation of this output"
        )
    )
    unit = models.CharField(
        max_length=255, help_text='The unit of measurement (e.g. "m2")'
    )

    class Meta:
        ordering = ["label"]
        verbose_name_plural = "Summable criteria"

    def __str__(self):
        return f"{self.label} ({self.unit})"


class Fund(models.Model):
    name = models.CharField(max_length=255, help_text="Give a short name to this Fund")
    short_description = models.CharField(
        max_length=255,
        help_text="Give a short description, shown to the Applicant in the choice list",
    )
    long_description = models.TextField(
        help_text=(
            "Provide a more detailed explanation of this Fund and its purpose, some details of its output "
            "criteria, etc. Bear in mind the potential Applicant will be searching against this content so be sure "
            "to include helpful keywords."
        )
    )
    countable_criteria = models.ManyToManyField(
        CountableCriterion,
        blank=True,
        related_name="funds",
    )
    summable_criteria = models.ManyToManyField(
        SummableCriterion, blank=True, related_name="funds"
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def countables_summary(self):
        return [c.label for c in self.countable_criteria.all()]

    @property
    def summables_summary(self):
        return [c.label for c in self.summable_criteria.all()]
